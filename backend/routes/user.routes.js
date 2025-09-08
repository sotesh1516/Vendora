const express = require("express");
const { updateUserBookingList, updateUserListingList, fetchUserBookingList, fetchUserListingList, fetchUserFavoriteList, updateUserFavoriteList, registerUserCashAppHandle, registerUserVenmoHandle, fetchUserCashAppHandle, fetchUserVenmoHandle, checkUserBookingForListing, fetchUserInfo, fetchBookingsSpecificToAListing } = require("../controllers/user.controller");
const { authorizeUser } = require("../middlewares/jwt");
const router = express.Router();

//change the fetch POST method to get with fetchInfo passed through req.query..
router.get("/me", authorizeUser, fetchUserInfo);
router.patch("/mybookings/:bookingId", authorizeUser, updateUserBookingList);
router.patch("/mylistings/:listingId", authorizeUser, updateUserListingList);
router.get("/mybookings/", authorizeUser, fetchUserBookingList);
router.get("/mylistings/", authorizeUser, fetchUserListingList);
router.get("/myfavorites/", authorizeUser, fetchUserFavoriteList);
router.put("/favorites/:listingId", authorizeUser, updateUserFavoriteList);
router.post("/paymentinfo/cashapp/:id", registerUserCashAppHandle);
router.post("/paymentinfo/venmo/:id", registerUserVenmoHandle);
router.get("/paymentinfo/cashapp/:id", fetchUserCashAppHandle);
router.get("/paymentinfo/venmo/:id", fetchUserVenmoHandle);
router.get("/bookings/check/listing/:listingId", authorizeUser, checkUserBookingForListing);
router.get("/mylistings/:id/bookings", authorizeUser, fetchBookingsSpecificToAListing);

module.exports = router;