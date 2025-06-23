const express = require("express");
const Booking = require("../models/booking.model");

const createBooking = async (req, res) => {
    //parse the req body
    //make sure the necessary attributes are not empty
    //

    const newBooking = req.body;

    console.log(newBooking);
    res.status(200).json({"book": newBooking, "message": "Successfully booked the service"});
}