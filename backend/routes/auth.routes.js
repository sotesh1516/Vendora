const express = require("express");
const { signUp, signIn, refreshAccessToken } = require("../controllers/auth.controller");

const router = express.Router();

router.post('/token', refreshAccessToken);
router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;