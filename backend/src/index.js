const express = require("express");
const cors = require("cors");
const connect = require("./database");
const userRouter = require("./routers/user");
const itemRouter = require("./routers/item");
const materialRouter = require("./routers/material");
const receiverRouter = require("./routers/receiver");
const postRouter = require("./routers/post");
require("dotenv").config();

const port = process.env.PORT;

const app = express();
app.use(express.json());
connect();

app.use("/users", userRouter);
app.use("/items", itemRouter);
app.use("/materials", materialRouter);
app.use("/post", postRouter);
app.use("/receivers", receiverRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
