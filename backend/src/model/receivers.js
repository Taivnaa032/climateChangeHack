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

const UserSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: "users",
  },
  sent: { type: Boolean },
  got: { type: Boolean, default: false },
  item: { type: String },
  price: { type: Number },
  weight: { type: String },
  count: { type: Number },
  free: { type: Boolean },
  read:{ type: Boolean, default: false }
});

const ReceiverSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  purpose: { type: String, default: "" },
  image: { type: String, default: "" },
  location: { type: String, default: "" },
  createdAt: { type: String, default: moment().format("MMMM Do YYYY") },
  materials: { type: [String], default: [] },
  requests: { type: [UserSchema] },
  items: { type: [ItemSchema] },
});

const Receiver = mongoose.model("receivers", ReceiverSchema);

module.exports = Receiver;
