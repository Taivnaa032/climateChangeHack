const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT;

const app = express();

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
