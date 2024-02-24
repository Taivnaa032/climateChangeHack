const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGODB_URL);

const connect = async () => {
  try {
    mongoose.connection.once("open", () => {
      console.log("Connected to Mongo");
    });
  } catch (e) {
    console.log("Error connecting to Mongo");
  }
};

module.exports = connect;
