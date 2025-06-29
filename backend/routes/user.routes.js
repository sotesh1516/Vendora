const express = require("express");
const { updateUserBookingList, updateUserListingList } = require("../controllers/user.controller");
const router = express.Router();

router.post("/mybooking/update", updateUserBookingList);
router.post("/mylisting/update", updateUserListingList);

module.exports = router;