const sms = require('../middleware/smsValidation');
const User = require('../models/userModel');
const bcrypt = require("bcrypt");



const loadForgotPassword = async (req, res) => {
    try {
        res.render("forgotPassword")
    } catch (error) {
        console.log(error.message);
    }


}

const loadVeriftyForgotPassword = async (req, res) => {
    const user = await User.find();
    mobile = req.body.mobnumber;
    const userDetails = await User.findOne({ mobile: mobile })
    if (userDetails) {
        try {
            newOtp = sms.sendMessage(mobile, res);
            console.log(newOtp);
            res.render("forgetPasswordVOtp", { mobile: mobile, newOtp: newOtp })
        } catch (error) {
            console.log(error.message);
        }
    } else {
        res.render("forgotpassword", { message: "Please Enter A Valid Number!!", postive_message:'', user: req.session.user });
    }
}

const resendOtp = async (req, res) => {
    try {
        console.log(mobile);
        newOtp = sms.sendMessage(mobile, res);
        res.render("forgetPasswordVOtp", { mobile: mobile, newOtp: newOtp, postive_message:'' });
    } catch (error) {
        console.log(error.message);
    }
}

const verifyOtp = async (req, res) => {
    try {
        const newOtp = await req.body.newOtp;
        const enteredOtp = await req.body.eotp;
        if (enteredOtp == newOtp) {
            const mobilenumber = await req.body.mobile;
            res.render("newPassword", { mobilenumber: mobilenumber });
        } else {
            res.render("login", { message: "Otp Failed!!", postive_message:'', user: req.session.user });
        }
    } catch (error) {
        console.log(error.message);
    }
};

const resetPassword = async (req, res) => {
    try {
        const phoneNumber = req.body.mobilenumber;
        const newPassword = req.body.re_password;
        const secure_password = await bcrypt.hash(newPassword, 10)
        const updatedData = await User.updateOne({ mobile: phoneNumber }, { $set: { password: secure_password } })
        console.log("updated data "+updatedData);
        if (updatedData) {
            res.status(200).render("login", { postive_message: "Password Reset Successfully , Login Now",message:'', user: req.session.user })
        } else {
            res.render("login", { message: "Verification Failed", user: req.session.user });
        }
    } catch (error) {
        console.log(error.message);
    }
}



module.exports = {
    loadForgotPassword,
    loadVeriftyForgotPassword,
    verifyOtp,
    resetPassword,
    resendOtp,
}