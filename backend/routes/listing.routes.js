const express = require("express");
const { createListing, fetchListings } = require("../controllers/listing.controller");
const router = express.Router();


router.post("/create", createListing);
router.get("/fetch", fetchListings);

module.exports = router;