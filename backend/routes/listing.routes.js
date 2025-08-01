const express = require("express");
const { createListing, fetchListings, fetchListingsAndSetFavorites, searchListings, fetchListing, editListing } = require("../controllers/listing.controller");
const router = express.Router();
const multer  = require('multer')
const upload = multer({dest: 'uploads/'});


router.post("/create", upload.array('images', 12) , createListing);
// router.get("/fetch", fetchListings); this does filter the user favorites
router.post("/fetch", fetchListingsAndSetFavorites);
//this needs to be changed, the use of verbs inside an end point is not a good practice
router.get("/search", searchListings)
router.get("/:id", fetchListing); // single fetch using url params
router.put("/:id", editListing);

module.exports = router;