const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, getUserProfile } = require('../controller/user_controller');

const { protect } = require("../middleware/protect");

router.post("/register" , registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/profile",protect, getUserProfile);


module.exports = router;