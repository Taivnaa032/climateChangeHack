const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Posts = require("../model/posts");
const User = require("../model/users");
const Item = require("../model/items");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("items.item");
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

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { $push: { items: { $each: items } } },
      { new: true }
    );

    await Promise.all(
      items.map(async (item) => {
        await Item.findByIdAndUpdate(item.item, { $push: { owners: _id } });
      })
    );

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.addMaterial = async (req, res) => {
  try {
    const { materials } = req.body;
    const _id = req.params.id;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { $push: { materials: materials } },
      { new: true }
    );

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send(error.message);
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
  const { password, email, username, location, image, bio, requests } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  console.log(req.body)
  try {
    //existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        message: "user exists",
      });
    }

    const user = await User.create({
      password: hashedPassword,
      email,
      username,
      location,
      image,
      bio,
      requests
    });

    console.log(user)

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "24h" }
    );
    console.log("user ====> ", user);

    res.status(200).send({
      message: "User created successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).populate("items");
    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          {
            email: user.email,
          },
          process.env.ACCESS_TOKEN_KEY,
          { expiresIn: "24h" }
        );

        res.status(200).send({
          exp: "",
          type: "users",
          token,
          userId: user._id,
          email: user.email,
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
  console.log("updateFieldsUser", updateFields);
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






