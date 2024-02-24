const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MaterialSchema = new Schema({
  title: { type: String },
  items: {
    type: Schema.ObjectId,
    ref: "items",
  },
});

const Material = mongoose.model("materials", MaterialSchema);

module.exports = Material;
