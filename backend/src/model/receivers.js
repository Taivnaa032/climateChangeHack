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

const ReceiverSchema = new Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String, required: true },
  purpose: { type: String },
  image: { type: String },
  location: { type: String },
  createdAt: { type: String, default: moment().format("MMMM Do YYYY") },
  materials: { type: [String] },
  items: { type: [ItemSchema] },
});

const Receiver = mongoose.model("receivers", ReceiverSchema);

module.exports = Receiver;
