const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  item: {
    type: Schema.ObjectId,
    ref: "items",
  },
  weight: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
});
const UserSchema = new Schema({
  image: { type: String },
  username: { type: String },
  email: { type: String },
  location: { type: String },
  password: { type: String, required: true },
  items: { type: [ItemSchema] },
  materials: { type: [String] },
  bio: { type: String },
  createdAt: { type: String, default: moment().format("MMMM Do YYYY") },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
