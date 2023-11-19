const express = require("express");
const forgot_Password = express();
const forgotP = require("../controllers/forgotpassword");

forgot_Password.set('views', './views/users');

forgot_Password.use(express.static('public'));

forgot_Password.get("/forgotP", forgotP.loadForgotPassword);

forgot_Password.post("/forgotP", forgotP.loadVeriftyForgotPassword);

forgot_Password.post("/fnewPassword", forgotP.verifyOtp);

forgot_Password.post("/resetP", forgotP.resetPassword)

forgot_Password.get("/resendotp", forgotP.resendOtp);

module.exports = forgot_Password;