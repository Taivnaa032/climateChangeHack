const express = require("express");
const cors = require("cors");
const connect = require("./database");

const bodyParser = require('body-parser');


const userRouter = require("./routers/user");
const itemRouter = require("./routers/item");
const materialRouter = require("./routers/material");
const receiverRouter = require("./routers/receiver");
const postRouter = require("./routers/post");


require("dotenv").config();


const port = process.env.PORT;


const app = express();

// app.use(express.json());
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

connect();



app.use("/users", userRouter);
app.use("/items", itemRouter);
app.use("/materials", materialRouter);
app.use("/post", postRouter);
app.use("/receivers", receiverRouter);



app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
