const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyUser(token, secretKey) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) return reject(err);
            return resolve(user);
        });
    });
}

async function authorizeUser(req, res, next) {
    //get the token from the request header
    //req.headers
    // {
    //      Authorzation: Bearere <TOKEN>
    //
    //}
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({message: "No token was sent"});
    }
    try {
        const decodedUser = await verifyUser(token, process.env.JWT_ACCESS_TOKEN);
        req.user = decodedUser;
        next();
    } catch (error) {

        // console.log("Token verification failed:");
        // console.log("Error message:", error.message);
        // console.log("Error name:", error.name);
        // console.log("Full error:", error);

        console.log({message: "Token is no longer valid"});
        return res.status(403).json({message: "Token is no longer valid"});
    }
    
}

// middleware/optionalAuth.js
async function optionalAuthorizeUser(req, res, next) {
    // Check if authorization header exists
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) {
      // No auth provided - continue as guest user
      req.user = null;
      return next();
    }
    
    // Auth provided - validate it
    try {
        const decodedUser = await verifyUser(token, process.env.JWT_ACCESS_TOKEN);
        req.user = decodedUser;
        next();
    } catch (error) {
        console.log({message: "Token is no longer valid"});
        return res.status(403).json({message: "Token is no longer valid"});
    }
  };


module.exports = { authorizeUser, verifyUser, optionalAuthorizeUser }