const express = require("express");
const { updateUserBookingList, updateUserListingList, fetchUserBookingList } = require("../controllers/user.controller");
const router = express.Router();

router.post("/mybooking/update", updateUserBookingList);
router.post("/mylisting/update", updateUserListingList);
router.post("/mybookings/fetch", fetchUserBookingList);

module.exports = router;