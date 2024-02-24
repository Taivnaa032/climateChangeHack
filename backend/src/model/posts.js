const mongoose = require("mongoose");
const moment = require("moment");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  owner: { type: Schema.ObjectId, ref: "users" },
  receiver: { type: Schema.ObjectId, ref: "receivers" },
  image: { type: String },
  caption: { type: String, required: true },
  free: { type: Boolean, required: true },
  price: { type: Number },
  createdAt: { type: String, default: moment().format("MMMM Do YYYY") },
});

const Post = mongoose.model("posts", PostSchema);

module.exports = Post;
