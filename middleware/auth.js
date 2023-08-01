const User = require('../models/userModel');
const { response } = require('../routes/userRoute');
const isLogin = async (req, res, next) => {
  try {
    if (req.session.user1) {
      const userData = await User.findOne({ _id: req.session.user_id })
      if (!userData.is_verified) {
        req.session.user1 = null;
        res.redirect("/login")
      } else {
        next();
        // res.render('login', { message: "you are blocked by admin",user:req.session.user })
      }
    } else {
      next()
      // res.redirect("/login")
    }
  } catch (error) {
    console.log(error.message);
  }
};

const isLogout = async (req, res, next) => {
  try {
    if (!req.session.user1) {
      next()
    }
    else {
      res.redirect("/home")
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  isLogin,
  isLogout,
};
