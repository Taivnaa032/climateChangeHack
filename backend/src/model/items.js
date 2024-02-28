const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  material: { type: Schema.ObjectId, ref: "materials" },
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
      ref: "receivers",
    },
  ],
});

const Item = mongoose.model("items", ItemSchema);

module.exports = Item;
