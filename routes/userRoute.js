const express = require("express");
const user_route = express();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const cartController = require("../controllers/cartController");



user_route.set("views", "./views/users");

user_route.get("/", auth.isLogout, userController.loadHome);

user_route.get("/home", userController.loadHome);

// user_route.get('/login', userController.loginLoad);

user_route.get("/register", userController.loadRegister);

user_route.get("/login", auth.isLogout, userController.loginLoad);

user_route.post("/login",auth.isLogout, userController.verifyLogin);

user_route.get('/register', auth.isLogout, userController.loadRegister)

user_route.post("/register", userController.loadOtp);

user_route.post("/againotp", userController.againOtp);

user_route.post("/otpPage", userController.verifyOtp);

user_route.get("/loadShop", userController.loadShop);

user_route.get("/logout", userController.userLogout);

user_route.use(auth.isLogin);


user_route.get("/view-details",userController.loadDetails);

user_route.get("/loadCart",cartController.loadCart);

user_route.get("/addToCart",cartController.addToCart);

user_route.post("/updateCart",cartController.updateCart);

user_route.get('/delete-cart',cartController.deleteCart)

user_route.get("/loadCheckout",userController.loadCheckout);

user_route.post("/applyCoupon",userController.applyCoupon);

user_route.get("/userProfile",userController.loadUserProfile);

user_route.get("/userOrders",userController.loadUserOrders);

user_route.post("/addAddress",userController.addNewAddress);

user_route.get("/delete-address",userController.deleteAddress);

user_route.get("/edit-address",userController.editAddress);

user_route.post("/edit-address",userController.editUpdateAddress);

user_route.get("/editUser",userController.editUser);

user_route.post("/editUser",userController.editUserUpdate);

user_route.get("/editcheckout-address",userController.editCheckoutAddress);

user_route.post("/editcheckout-address",userController.editUpdateCheckoutAddress);

user_route.get("/deletecheckout-address",userController.deleteCheckoutAddress);

user_route.post("/orderSuccess",userController.placeOrder);

user_route.get("/vieworder",userController.viewOrderDetails)

user_route.get("/cancelorder",userController.cancelOrder);

user_route.get("/returnOrder",userController.retunOrder);

user_route.get("/returned",userController.retunSuccess);

user_route.get("/onlinePayment",userController.loadOrderSuccess);

user_route.get("/orders/:orderId/invoice",userController.downloadInvoice);

module.exports = user_route;
