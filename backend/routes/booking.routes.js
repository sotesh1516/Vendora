const express = require("express");
const { createBooking } = require("../controllers/booking.controller");
const { authorizeUser } = require("../middlewares/jwt");
const router = express.Router();

router.post("/", authorizeUser, createBooking);

module.exports = router;