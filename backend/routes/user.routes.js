const express = require("express");
const { updateUserBookingList, updateUserListingList, fetchUserBookingList, fetchUserListingList, fetchUserFavoriteList, updateUserFavoriteList, registerUserCashAppHandle, registerUserVenmoHandle, fetchUserCashAppHandle, fetchUserVenmoHandle, checkUserBookingForListing } = require("../controllers/user.controller");
const { authorizeUser } = require("../middlewares/jwt");
const router = express.Router();

//change the fetch POST method to get with fetchInfo passed through req.query..
router.post("/mybooking/update", updateUserBookingList);
router.patch("/mylistings/:listingId", updateUserListingList);
router.get("/mybookings/", authorizeUser, fetchUserBookingList);
router.get("/mylistings/", authorizeUser, fetchUserListingList);
router.patch("/myfavorites/:id", fetchUserFavoriteList);
router.put("/favorites/:listingId", authorizeUser, updateUserFavoriteList);
router.post("/paymentinfo/cashapp/:id", registerUserCashAppHandle);
router.post("/paymentinfo/venmo/:id", registerUserVenmoHandle);
router.get("/paymentinfo/cashapp/:id", fetchUserCashAppHandle);
router.get("/paymentinfo/venmo/:id", fetchUserVenmoHandle);
router.get("/users/:id/bookings/check", checkUserBookingForListing);

module.exports = router;