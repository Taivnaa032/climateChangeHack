const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  material: { type: String },
  title: { type: String },
  owners: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  receivers: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

const Item = mongoose.model("items", ItemSchema);

module.exports = Item;
