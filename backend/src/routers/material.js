const express = require("express");
const {
  getItems,
  addItems,
  getMaterial,
  getAllMaterials,
} = require("../controller/material");

const materialRouter = express.Router();

materialRouter
  .get("/:item", getItems)
  .get("/all", getAllMaterials)
  .get("/get/:id", getMaterial)
  .put("/create/:id", addItems);

module.exports = materialRouter;
