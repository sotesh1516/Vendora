const express = require("express");
const { signUp, signIn, refreshAccessToken, whoAmI, signOut } = require("../controllers/auth.controller");
const { authorizeUser } = require("../middlewares/jwt");

const router = express.Router();

router.post('/token', refreshAccessToken);
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/whoami', authorizeUser, whoAmI);
router.post('/refresh', refreshAccessToken);
router.post('/signout', signOut);

module.exports = router;