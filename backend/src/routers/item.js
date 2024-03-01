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
  getAllItems,
  getItemByTitle,
  getId,
} = require("../controller/item");

const itemRouter = express.Router();

itemRouter
  .get("/item/:id", getId)
  .get("/title/:title", getItemByTitle)
  .get("/:id", getUsersByItem)
  .get("/all", getAllItems)
  .get("/material/:material", getItemsByMaterial)
  .put("/addOwner/:id", addOwner)
  .put("/addReceiver/:id", addReceiver)
  .get("/users/:id", searchUsers)
  .get("/receivers/:id", searchReceivers)
  .get("/:material/users", searchUsersByMaterial)
  .get("/:material/receivers", searchReceiversByMaterial)
  .post("/create", createItem);

module.exports = itemRouter;
