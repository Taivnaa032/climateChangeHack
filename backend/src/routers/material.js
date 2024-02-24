const express = require("express");
const { getItems } = require("../controller/material");

const materialRouter = express.Router();

materialRouter.get("/:item", getItems);

module.exports = materialRouter;
