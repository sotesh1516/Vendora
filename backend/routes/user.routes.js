const express = require("express");
const { updateUserBookingList, updateUserListingList, fetchUserBookingList, fetchUserListingList, fetchUserFavoriteList, updateUserFavoriteList } = require("../controllers/user.controller");
const router = express.Router();

//change the fetch POST method to get with fetchInfo passed through req.query..
router.post("/mybooking/update", updateUserBookingList);
router.post("/mylisting/update", updateUserListingList);
router.post("/mybookings/fetch", fetchUserBookingList);
router.post("/mylistings/fetch", fetchUserListingList);
router.post("/myfavorites/fetch", fetchUserFavoriteList);
router.post("/myfavorite/update", updateUserFavoriteList);

module.exports = router;