const express = require("express");
const { createListing, fetchListings, fetchListingsAndSetFavorites, searchListings } = require("../controllers/listing.controller");
const router = express.Router();


router.post("/create", createListing);
// router.get("/fetch", fetchListings); this does filter the user favorites
router.post("/fetch", fetchListingsAndSetFavorites);
//this needs to be changed, the use of verbs inside an end point is not a good practice
router.get("/search", searchListings)

module.exports = router;