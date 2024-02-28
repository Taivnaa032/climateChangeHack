const express = require("express");
const {
  getUser,
  createUser,
  updateUser,
  Login,
  getUserDataByToken,
  deleteUser,
  getAllUsers,
  addItems,
  addMaterial,
} = require("../controller/user");

const userRouter = express.Router();

userRouter
  .get("/all", getAllUsers)
  .get("/:id", getUser)
  .post("/create", createUser)
  .put("/:id", updateUser)
  .delete("/:id", deleteUser)
  .post("/login", Login)
  .get("/getByToken", getUserDataByToken)
  .post("/addItems/:id", addItems)
  .post("/addMaterial/:id", addMaterial);

module.exports = userRouter;
