
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/BIG-SHOPY");

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected');
  })
  