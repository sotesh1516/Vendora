const express = require("express");
const Booking = require("../models/booking.model");

const createBooking = async (req, res) => {
    //parse the req body
    //make sure the necessary attributes are not empty
    //
    const newBooking = req.body;

    const bookingToSave = new Booking(newBooking);

    const savedBooking = await bookingToSave.save();

    return res.status(200).json({
        booking: savedBooking,
        message: "Booking has been successfully created",
      });
}

module.exports = {createBooking};