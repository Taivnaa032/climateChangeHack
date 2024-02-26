const express = require("express");
const {
  getUsersByItem,
  getItemsByMaterial,
  addOwner,
  addReceiver,
  searchUsers,
  searchReceivers,
  searchUsersByMaterial,
  searchReceiversByMaterial,
  createItem,
} = require("../controller/item");

const itemRouter = express.Router();

itemRouter
  .get("/:id", getUsersByItem)
  .get("/material/:material", getItemsByMaterial)
  .put("/addOwner/:id", addOwner)
  .put("/addReceiver/:id", addReceiver)
  .get("/users/:id", searchUsers)
  .get("/receivers/:id", searchReceivers)
  .get("/:material/users", searchUsersByMaterial)
  .get("/:material/receivers", searchReceiversByMaterial)
  .post("/create", createItem);

module.exports = itemRouter;
