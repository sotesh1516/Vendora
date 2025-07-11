const express = require("express");
const { updateUserBookingList, updateUserListingList, fetchUserBookingList, fetchUserListingList } = require("../controllers/user.controller");
const router = express.Router();

router.post("/mybooking/update", updateUserBookingList);
router.post("/mylisting/update", updateUserListingList);
router.post("/mybookings/fetch", fetchUserBookingList);
router.post("/mylistings/fetch", fetchUserListingList);
router.post

module.exports = router;