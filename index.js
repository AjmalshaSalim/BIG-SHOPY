const express = require("express")
const app = express()
const nocache = require('nocache');
const path = require('path')
const config = require("./config/config");
const session = require("express-session");
const mongoose = require("mongoose")
mongoose.set('strictQuery', false);
const mongoSanitize = require('express-mongo-sanitize');
require('./config/connection.js')

app.use(session({
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.set('view engine', 'ejs');
app.set("views", "views/");

app.use(express.static(path.resolve("./public")));
app.use(mongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(nocache());

const userRoute = require("./routes/userRoute");
app.use("/", userRoute);

const adminRoute = require("./routes/adminRoute");
app.use("/admin", adminRoute);

const forgotPassword = require("./routes/forgotPassword");
app.use("/forgot", forgotPassword);

app.all("*", (req, res) => {
  res.render("error")
})

app.listen(5555, function () {
  console.log("[server] running at port:555...");
});