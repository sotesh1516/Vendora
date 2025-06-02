const express = require("express");
const Listing = require("../models/listing.model");

const createListing = async (req, res) => {
  try {
    const newListing = req.body;

    if (
      !newListing.serviceProvider ||
      !newListing.serviceName ||
      !newListing.ratePerHr ||
      !newListing.rating ||
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
    const savedListing = listingToSave.save();
    return res.status(200).json({
      listing: savedListing,
      message: "Listing has been successfully created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
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
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { createListing, editListing };
