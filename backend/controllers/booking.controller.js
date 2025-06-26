const express = require("express");
const Booking = require("../models/booking.model");

const createBooking = async (req, res) => {
    try {
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
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error during listing creation" }); 
    }
    
}

const fetchBookings = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {createBooking};