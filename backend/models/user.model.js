const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },

    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    },

    password: {
        type: String,
        required: true,
        minlength: 8
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});