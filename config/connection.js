
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb+srv://Ajmalsha:6v6crnx2ev@atlascluster.ckkumek.mongodb.net/BIG-SHOPY?retryWrites=true&w=majority");

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected');
  })
  