const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    //access the listing personnel using the listing itself
    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing"
    },

    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    customerSummary: {
        type: String,
        required: true,
    },

    timeSlot: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        //enum: ["pending", "accepted", "completed", "not approved"],
        enum: ["booked", "completed"],
        required: true,
    }



})

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking 
