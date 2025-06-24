const express = require("express");
const { createBooking } = require("../controllers/booking.controller");
const router = express.Router();

router.post("/create", createBooking);

module.exports = router;