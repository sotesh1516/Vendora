const express = require("express");
const Listing = require("../models/listing.model");
const User = require("../models/user.model");
const cloudinary = require("../cloud_uploads/image");

const createListing = async (req, res) => {
  try {
    // const unstructuredNewListing = req.body;
    // const newListing = {
    //   serviceProvider: unstructuredNewListing.serviceProvider,
    //   serviceName: unstructuredNewListing.serviceName,
    //   serviceOptions: [],
    //   timeSlots: [],
    //   ratePerHr: unstructuredNewListing.ratePerHr,
    //   ratings: [],
    //   descriptions: unstructuredNewListing.ratePerHr,
    //   //new to add url to images after passing it through cloudinary
    // };

    // if (
    //   !unstructuredNewListing.serviceProvider ||
    //   !unstructuredNewListing.serviceName ||
    //   !unstructuredNewListing.serviceOptions ||
    //   !unstructuredNewListing.timeSlots ||
    //   !unstructuredNewListing.ratePerHr ||
    //   !unstructuredNewListing.description
    // ) {
    //   return res.status(400).json({ error: "One or more fields are missing" });
    // }

    // for (const key in unstructuredNewListing)
    // {
    //   if (Object.prototype.hasOwnProperty.call(unstructuredNewListing, key))
    //   {
    //     if (key === "serviceOptions" || key === "timeSlots" || key === "ratings")
    //     {

    //     }
    //   }
    // };

    const newListing = req.body;
    const images = req.files;

    if (
      !newListing.serviceProvider ||
      !newListing.serviceName ||
      !newListing.serviceOptions ||
      !newListing.timeSlots ||
      !newListing.ratePerHr ||
      !newListing.description
    ) {
      console.log("One or more field backend");
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

    const structuredNewListing = {
      serviceProvider: newListing.serviceProvider,
      serviceName: newListing.serviceName,
      serviceOptions: newListing.serviceOptions,
      timeSlots: newListing.timeSlots,
      ratePerHr: newListing.ratePerHr,
      description: newListing.description,
      cloudStoredImages: [],
    };

    //handle image upload
    for (const image of images) {
      const uploadResult = await cloudinary.uploader.upload(image.path, {
        folder: `listings/`,   // creates virtual folder
        public_id: "listings",         
      });
      structuredNewListing.cloudStoredImages.push(uploadResult);
    }

    const listingToSave = new Listing(structuredNewListing);
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
    const listingId = req.params;

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
      { _id: listingId },
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

const fetchListing = async (req, res) => {
  try {
    const fetchInfo = req.params;

    const fetchedListing = await Listing.findById(fetchInfo.id).exec();

    if (!fetchedListing) {
      return res.status(404).json({
        message: "Listing not found",
      });
    }

    return res.status(200).json({
      fetchedListing: fetchedListing,
      message: "Booking data retrieved",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "Internal server error during single listing fetch" });
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

    return res.status(200).json({
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
    const limit = 20;
    const pageNumber = parseInt(req.query.pageNumber) || 0;
    const verifiedUser = req.user;
    const skip = pageNumber * limit;
    let fetchedListings = await Listing.find()
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit); // check whether to set a limit for the fetch or just fetch as much as possible

    if (!verifiedUser)
    {
      return res.status(200).json({listings: fetchedListings,
        message:
          "Listings have been successfully fetched"});
    }

    let fetchedUser = await User.findById(verifiedUser.id).populate(
      "myFavorites"
    );

    const newListingCollection = [];

    fetchedListings.map((listing) => {
      const listingFound = fetchedUser.myFavorites.find(
        (favListing) => favListing._id.toString() === listing._id.toString()
      );

      const restructuredListing = {
        _id: listing._id,
        serviceProvider: listing.serviceProvider,
        serviceProviderId: listing.serviceProviderId,
        serviceName: listing.serviceName,
        serviceOptions: listing.serviceOptions,
        timeSlots: listing.timeSlots,
        ratePerHr: listing.ratePerHr,
        ratings: listing.ratings,
        description: listing.description,
        cloudStoredImages: listing.cloudStoredImages,
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
    return res.status(500).json({
      error:
        "Internal server error during custom listing(favorite included) fetch",
    });
  }
};

const searchListings = async (req, res) => {
  try {
    const searchFilter = req.query;

    const matchedListings = await Listing.find({
      $or: [
        { serviceName: { $regex: searchFilter.query, $options: "i" } },
        { serviceProvider: { $regex: searchFilter.query, $options: "i" } },
        { description: { $regex: searchFilter.query, $options: "i" } },
      ],
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
  fetchListing,
  fetchListings,
  fetchListingsAndSetFavorites,
  searchListings,
};
