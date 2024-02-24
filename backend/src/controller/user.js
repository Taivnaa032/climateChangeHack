const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Posts = require("../model/posts");
const User = require("../model/users");
const Item = require("../model/items");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById({ _id }).populate("items.item");
    res.send(user);
  } catch (error) {
    res.send(error);
  }
};

exports.addItems = async (req, res) => {
  try {
    const { items } = req.body;
    const _id = req.params.id;
    const item = await User.updateMany(
      { _id },
      {
        $set: { items },
      }
    ).populate("items");
    res.status(200).send(item);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.getUserByItem = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.find({ items: _id }).populate("items");
    res.status(200).send(user);
  } catch (error) {
    res.send(error);
  }
};

exports.createUser = async (req, res) => {
  const { password, image, gmail, username, bio, location } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await User.create({
      password: hashedPassword,
      gmail,
      username,
      image,
      bio,
      location,
    });
    res.status(200).send({ user, ownerAdded });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).populate("items");
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          {
            username: user.email,
          },
          process.env.ACCESS_TOKEN_KEY,
          { expiresIn: "24h" }
        );

        res.status(200).send({
          exp: "",
          match,
          token,
          userId: user._id,
          username: user.username,
        });
      } else {
        res.status(404).send({ message: "wrong password" });
      }
    } else {
      res.status(404).send({ message: "no user found" });
    }
  } catch (error) {
    res.status(404).send({ message: error });
  }
};

exports.updateUser = async (req, res) => {
  const _id = req.params.id;
  const updateFields = req.body;
  const { items } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(_id, {
      ...updateFields,
    }).populate("items");

    if (!updatedUser) {
      throw new MyError(404, "User not found");
    }

    const ownerAdded = await Item.updateMany(
      { _id: items },
      {
        $push: { owners: _id },
      }
    );

    res.status(200).json({
      updatedUser,
      message: "successfully updated user",
      ownerAdded,
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.getUserDataByToken = async (req, res) => {
  const token = req?.headers?.token;
  try {
    await jwt.verify(
      token,
      process.env.ACCESS_TOKEN_KEY,
      async (error, _user) => {
        if (error) {
          return res.send({ error: error }).status(500);
        }
        const { email } = await jwt.decode(token, process.env.ACCESS_TOKEN_KEY);
        const userData = await User.findOne({ email: email });
        return res.status(200).send({ ...userData });
      }
    );
  } catch (error) {
    res.send(error).status(404);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findByIdAndDelete({ _id });
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
};
