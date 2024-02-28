const express = require("express");
const {
  getReceiver,
  createReceiver,
  Login,
  updateUser,
  getUserDataByToken,
  deleteUser,
  getAllReceivers,
  addItems,
  addMaterial,
} = require("../controller/receiver");

const receiverRouter = express.Router();

receiverRouter
  .get("/all", getAllReceivers)
  .get("/:id", getReceiver)
  .post("/create", createReceiver)
  .post("/login", Login)
  .put("/:id", updateUser)
  .get("/getToken", getUserDataByToken)
  .post("/addItems/:id", addItems)
  .post("/addMaterial/:id", addMaterial)
  .delete("/:id", deleteUser);

module.exports = receiverRouter;
