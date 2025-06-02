const express = require("express");
const { createListing } = require("../controllers/listing.controller");
const router = express.Router();


router.post("/create", createListing);

module.exports = router;