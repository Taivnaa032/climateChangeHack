const express = require("express");
const receiverRouter = express.Router();

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
  addRequest,
  updateRequest,
  showNotifications,
} = require("../controller/receiver");


receiverRouter
  .get("/requests/:id", showNotifications)
  .get("/all", getAllReceivers)
  .get("/:id", getReceiver)
  .post("/create", createReceiver)
  .post("/login", Login)
  .put("/:id", updateUser)
  .put("/updateRequest/:id", updateRequest) 
  .get("/getToken", getUserDataByToken)
  .post("/addItems/:id", addItems)
  .post("/addMaterial/:id", addMaterial)
  .post("/addRequest/:id", addRequest)
  .delete("/:id", deleteUser);

module.exports = receiverRouter;
