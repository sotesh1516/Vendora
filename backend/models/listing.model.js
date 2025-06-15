const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    serviceProvider: {
        type: String,
        required: true,
        minlength: 3,
    },
    
    serviceName: {
        type: String,
        required: true,
        minlength: 3,
    },

    serviceOptions: {
        type: Array,
        required: true,
    },

    timeSlot: [{
        type: String,
    }],

    ratePerHr: {
        type: Number,
        required: true
    },

    ratings: {
        type: Array,
        required: true,
    },


    description: {
        type: String,
        required: true,
    },


})


const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;