const bcrypt = require("bcrypt");
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

userSchema.pre('save', async function(next) {
    //this is necessary because you dont want to hash the password when you everytime update the user 
    //For example last login update, in general anything other than password change
    if (!this.isModified('password')) return next();

    try {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;