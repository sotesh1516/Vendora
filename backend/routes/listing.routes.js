const express = require("express");
const { createListing, fetchListings, fetchListingsAndSetFavorites } = require("../controllers/listing.controller");
const router = express.Router();


router.post("/create", createListing);
// router.get("/fetch", fetchListings); this does filter the user favorites
router.post("/fetch", fetchListingsAndSetFavorites);

module.exports = router;