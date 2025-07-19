const express = require("express");
const Listing = require("../models/listing.model");
const User = require("../models/user.model");

const createListing = async (req, res) => {
  try {
    const newListing = req.body;

    if (
      !newListing.serviceProvider ||
      !newListing.serviceName ||
      !newListing.serviceOptions ||
      !newListing.timeSlots ||
      !newListing.ratePerHr ||
      !newListing.description
    ) {
      return res.status(400).json({ error: "One or more fields are missing" });
    }

    if (newListing.serviceProvider.length < 4) {
      return res
        .status(400)
        .json({ error: "Service provider nanme is too short" });
    }

    if (newListing.serviceName.length < 4) {
      return res.status(400).json({ error: "Service name is too short" });
    }

    const listingToSave = new Listing(newListing);
    const savedListing = await listingToSave.save();
    return res.status(200).json({
      listing: savedListing,
      message: "Listing has been successfully created",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal server error during listing creation" });
  }
};

const editListing = async (req, res) => {
  try {
    const incomingListing = req.body;

    if (
      !incomingListing.serviceProvider ||
      !incomingListing.serviceName ||
      !incomingListing.ratePerHr ||
      !incomingListing.rating ||
      !incomingListing.description
    ) {
      return res.status(400).json({ error: "One or more fields are missing" });
    }

    const updatedListing = await Listing.replaceOne(
      { _id: incomingListing.id },
      incomingListing
    );
    return res.status(200).json({
      listing: updatedListing,
      message: "Listing has been successfully updated",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal server error during listing update" });
  }
};

const fetchListings = async (req, res) => {
  try {
    let fetchedListings = await Listing.find().limit(10);

    // console.log(fetchedListings);

    if (!fetchedListings) {
      return res.status(404).json({ error: "Listing fetch returned null" });
    }

    if (fetchedListings.length == 0) {
      return res
        .status(200)
        .json({ listings: fetchedListings, message: "No listings found" });
    }

    return res
      .status(200)
      .json({
        listings: fetchedListings,
        message: "Listings have been successfully fetched",
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal server error during listing fetch" });
  }
};

const fetchListingsAndSetFavorites = async (req, res) => {
  try {
    const fetchInformation = req.body;
    let fetchedListings = await Listing.find(); // check whether to set a limit for the fetch or just fetch as much as possible

    let fetchedUser = await User.findById(fetchInformation.userId).populate(
      "myFavorites"
    );

    const newListingCollection = [];

    fetchedListings.map((listing) => {
      const listingFound = fetchedUser.myFavorites.find(
        (favListing) => favListing._id.toString() === listing._id.toString()
      );

      const restructuredListing = {
        serviceProvider: listing.serviceProvider,
        serviceProviderId: listing.serviceProviderId,
        serviceName: listing.serviceName,
        serviceOptions: listing.serviceOptions,
        timeSlots: listing.timeSlots,
        ratings: listing.ratings,
        description: listing.description,
        isFavorite: false,
      };

      if (listingFound) {
        restructuredListing.isFavorite = true;
      }

      //push the restructured listing into the new array
      newListingCollection.push(restructuredListing);
    });

    res.status(200).json({
      listings: newListingCollection,
      message:
        "Listings together with favorites have been successfully fetched",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({
        error:
          "Internal server error during custom listing(favorite included) fetch",
      });
  }
};

const searchListings = async (req, res) => {
  try {
    const searchFilter = req.query;

    const matchedListings = await Listing.find({
      serviceName: { $regex: searchFilter.query, $options: "i" }, 
      serviceProvider: { $regex: searchFilter.query, $options: "i" },
      description: { $regex: searchFilter.query, $options: "i" },
    });

    if (!matchedListings) {
      console.log("Listing(s) not found during search fetch");
      return res
        .status(401)
        .json({ error: "Listing(s) not found during search fetch" });
    }

    return res.status(200).json({
      fetchedListings: matchedListings,
      message: "Listings have been successfully fetched",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal server error during listings search fetch" });
  }
};

module.exports = {
  createListing,
  editListing,
  fetchListings,
  fetchListingsAndSetFavorites,
  searchListings
};
