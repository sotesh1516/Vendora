const express = require("express");
const { createListing } = require("../controllers/listing.controller");
const router = express.Router();


router.post("listing/create", createListing);

module.exports = router;