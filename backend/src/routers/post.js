const express = require("express");
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
} = require("../controller/post");

const postRouter = express.Router();

postRouter
  .get("/", getAllPosts)
  .post("/", createPost)
  .get("/:items", createPost)
  .put("/:id", updatePost)
  .delete("/:id", deletePost);

module.exports = postRouter;
