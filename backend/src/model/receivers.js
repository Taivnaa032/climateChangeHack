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
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  purpose: { type: String, default: "" },
  image: { type: String, default: "" },
  location: { type: String, default: "" },
  createdAt: { type: String, default: moment().format("MMMM Do YYYY") },
  materials: { type: [String], default: [] },
  requests: {type: [String]},
  items: { type: [ItemSchema], default: [] },
});

const Receiver = mongoose.model("receivers", ReceiverSchema);

module.exports = Receiver;
