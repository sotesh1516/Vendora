const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
// const connectDB = require("../models/db");
const User = require("../models/user.model");
const { verifyUser } = require("../middlewares/jwt");

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

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) return res.status(401).json({message: "refresh token does not exist"});
    //check if the refreshtoken it legit
    //verify the refreshtoken using jwt.verify
    const verifiedUser = verifyUser(refreshToken, process.env.JWT_REFRESH_TOKEN);

    if (!verifiedUser) {
      res.status().json({})
    }

    const accessToken = generateAccessToken({
      name: verifiedUser.name,
      username: verifiedUser.username,
      email: verifiedUser.email,
      id: verifiedUser.id,
    });

    res.status(200).json({accessToken: accessToken});

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error during access token refreshing" });
  }
}

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

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.JWT_ACCESS_TOKEN, {expiresIn: '10m'});
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

    //this allows forever access which is why we need a acces + refresh token => gives limited and timed use which
    //for access token which needs to be renewed by a refreshed token timely
    //Also invalidate a refresh token through a logout route
    //takes in a payload, can be user object, that needs to be serialized
    const accessToken = generateAccessToken(userWithOutPassword);
    const refreshToken = jwt.sign(userWithOutPassword, process.env.JWT_REFRESH_TOKEN, { expiresIn: '7d' }); // Long-lived refresh token

    //refresh tokens must be saved some where like redis or a database
    // Set refresh token as HttpOnly cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      path: '/'
    });


    return res
      .status(200)
      .json({ accessToken: accessToken, message: "Signed in successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const signOut = async (req, res) => {
  try {
    const verifiedUser = req.user;
    

  } catch (error) {
    
  }
}

//this auth check is done for the mvp only
const whoAmI = async (req, res) => {
  const verifiedUser = req.user;
  try {
    return res.status(200).json({
      authenticated: true,
      user: {
        id: verifiedUser.id,
        email: verifiedUser.email,
        name: verifiedUser.name,
        // Add any other safe user fields you want to return
      }
    });
  } catch (error) {
    return res.status(500).json({ 
      error: "Internal server error" 
    });
  }
};

module.exports = { signUp, signIn, refreshAccessToken, whoAmI };
