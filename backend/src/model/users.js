const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  item: {
    type: Schema.ObjectId,
    ref: "items",
  },
  weight: { type: String, default: "0kg" },
  count: { type: Number, default: 0 },
  free: { type: Boolean, default: false },
  price: { type: Number },
});

const ReceiverSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "receivers",
  },
  sent: { type: Boolean },
  got: { type: Boolean }

});


const UserSchema = new Schema({
  image: { type: String, default: "" },
  username: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, default: "" },
  password: { type: String, required: true },
  items: { type: [ItemSchema], default: [] },
  materials: { type: [String], default: [] },
  bio: { type: String, default: "" },
  requests: { type: [ReceiverSchema] },
  createdAt: { type: String, default: moment().format("MMMM Do YYYY") },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
