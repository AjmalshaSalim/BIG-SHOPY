const User = require('../models/userModel');

const isLogin = async (req, res, next) => {
  try {

    if (req.session.user1) {
      const userData = await User.findOne({ _id: req.session.user_id })

      if (!userData.is_verified) {
        req.session.user1 = null;
        next();
      } else {
        next();
      }

    } else {
      next();
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
