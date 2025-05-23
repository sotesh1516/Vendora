const bcrypt = require("bcrypt");
// const connectDB = require("../models/db");
const User = require("../models/user.model");

const signup = async (req, res) => {
  try {
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const newUser = req.body;

    if (
      !newUser.name ||
      !newUser.username ||
      !newUser.email ||
      !newUser.password
    ) {
      return res.status(400).json({ error: "One or more fields are missing" });
    }

    if (!isValidEmail(newUser.email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (newUser.password.length < 8) {
      return res.status(400).json({ error: "Password is too short" });
    }

    if (newUser.username.length < 4) {
      return res.status(400).json({ error: "Username is too short!" });
    }

    //check if the user already exists through
    const userExists = await User.findOne({ email: newUser.email }).exec();

    if (userExists) {
      return res.status(400).json({ error: "Email already in use" });
    }
    console.log("It has finished validation")
    //add the user to the database
    //password hashing has been handled by a hook in the schema file
    const userToSave = new User({name: newUser.name, username: newUser.username, email: newUser.email, password: newUser.password});
    const savedUser = await userToSave.save();
    return res.status(200).json({"user": savedUser, "message": "User has been successfully registered"});

  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: "Internal server error" }); 
  }
};

module.exports = {signup};
