const Post = require("../model/posts");

exports.getAllPosts = async (req, res) => {
  try {
    const post = await Post.find({}).populate("owner");
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.create({ ...content }).populate("owner");
    res.send(post);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.getPosts = async (req, res) => {
  try {
    const { items } = req.params;
    const posts = await Post.find({ items }).populate("owner");
    res.send(posts);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.updatePost = async (req, res) => {
  try {
    const _id = req.params.id;
    const { content } = req.body;
    const post = await Post.findByIdAndUpdate(_id, { ...content });
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.deletePost = async (req, res) => {
  try {
    const _id = req.params.id;
    const post = await Post.findByIdAndDelete({ _id });
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send(error);
  }
};
