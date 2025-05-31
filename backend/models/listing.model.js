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