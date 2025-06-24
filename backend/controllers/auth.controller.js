const bcrypt = require("bcrypt");
// const connectDB = require("../models/db");
const User = require("../models/user.model");

/** 
 * * validates whether the email has a correct format using regex
* @param {String} email - the email to be verified
* @returns {bool} returns a boolean 
*/

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Registers user 
 * 
 * - There are different validations that occur before the actual registration happen. These include
 *      - length of user's name
 *      - length of user's username
 *      - email format
 *      - the length of suggested password
 * @param {*} req = Express request object
 * @param {*} res - Express response object
 * @returns 
 */

const signUp = async (req, res) => {
  try {
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
    console.log("It has finished validation");
    //add the user to the database
    //password hashing has been handled by a hook in the schema file
    const userToSave = new User({
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
      password: newUser.password,
    });
    const savedUser = await userToSave.save();
    return res
      .status(200)
      .json({
        user: savedUser,
        message: "User has been successfully registered",
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const signIn = async (req, res) => {
  try {
    let inComingUser = req.body;

    if (!inComingUser.email || !inComingUser.password) {
      return res.status(400).json({ error: "One or more fields are missing" });
    }

    if (!isValidEmail(inComingUser.email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (inComingUser.password.length < 8) {
      return res.status(400).json({ error: "Password is too short" });
    }

    const userFound = await User.findOne({ email: inComingUser.email }).exec();

    if (!userFound) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(
      inComingUser.password,
      userFound.password
    );

    if (!isMatch) {
      return res.status(401).json({ user: "Invalid username or password" });
    }

    const userWithOutPassword = {
      name: userFound.name,
      username: userFound.username,
      email: userFound.email,
      id: userFound._id,
    };

    return res
      .status(200)
      .json({ user: userWithOutPassword, message: "Signed in successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { signUp, signIn };
