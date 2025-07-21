const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    serviceProvider: {
        type: String,
        required: true,
        minlength: 3,
    },

    serviceProviderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    
    serviceName: {
        type: String,
        required: true,
        minlength: 3,
    },

    serviceOptions: {
        type: [String],
        required: true,
    },

    timeSlots: {
        type: [String],
    },

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

    cloudStoredImages: {
        type: Array,
    }


})


const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;