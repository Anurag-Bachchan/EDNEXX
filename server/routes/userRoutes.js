const express = require("express");
const router = express.Router();

const {login, signup, sendOTP, changePassword, contactUs} = require("../controllers/Auth");
const { resetPasswordToken, resetPassword} = require("../controllers/ResetPassword");

const {auth} = require("../middlewares/auth");

// AUTHENTICATION ROUTES

// route for user login
router.post("/login",login);
// route for user signup
router.post("/signup",signup);
// route for sending OTP to the user's email
router.post("/sendotp",sendOTP);
// route for changing the password
router.post("/changepassword",auth, changePassword);
//route for contact Us
router.post("/contact",contactUs);


// RESET PASSWORD

// route for generating a reset password for reset password token
router.post("/reset-password-token", resetPasswordToken);
// route for reseting user's password after verfication
router.post("/reset-password",resetPassword);

module.exports= router;
