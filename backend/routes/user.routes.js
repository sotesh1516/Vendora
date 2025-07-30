const express = require("express");
const { updateUserBookingList, updateUserListingList, fetchUserBookingList, fetchUserListingList, fetchUserFavoriteList, updateUserFavoriteList, registerUserCashAppHandle, registerUserVenmoHandle, fetchUserCashAppHandle, fetchUserVenmoHandle } = require("../controllers/user.controller");
const router = express.Router();

//change the fetch POST method to get with fetchInfo passed through req.query..
router.post("/mybooking/update", updateUserBookingList);
router.post("/mylisting/update", updateUserListingList);
router.post("/mybookings/fetch", fetchUserBookingList);
router.post("/mylistings/fetch", fetchUserListingList);
router.post("/myfavorites/fetch", fetchUserFavoriteList);
router.post("/myfavorite/update", updateUserFavoriteList);
router.post("/paymentinfo/cashapp/:id", registerUserCashAppHandle)
router.post("/paymentinfo/venmo/:id", registerUserVenmoHandle)
router.get("/paymentinfo/cashapp/:id", fetchUserCashAppHandle)
router.get("/paymentinfo/venmo/:id", fetchUserVenmoHandle)

module.exports = router;