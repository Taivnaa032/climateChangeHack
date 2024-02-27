const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Posts = require("../model/posts");
const Receiver = require("../model/receivers");

exports.getAllReceivers = async (req, res) => {
  try {
    const receivers = await Receiver.find({}).populate("items.item");
    res.send({ receivers });
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.getReceiver = async (req, res) => {
  try {
    const _id = req.params.id;
    const receiver = await Receiver.findById({ _id }).populate("items.item");
    res.send(receiver);
  } catch (error) {
    res.send(error);
  }
};

exports.createReceiver = async (req, res) => {
  const {
    password,
    email,
    username,
    purpose,
    image,
    location,
    materials,
    items,
  } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const existingReceiver = await Receiver.findOne({ email });
    if (existingReceiver) {
      return res.status(401).send({
        message: "receiver exists",
      });
    }

    const receiver = await Receiver.create({
      password: hashedPassword,
      email,
      username,
      purpose,
      image,
      location,
      materials,
      items,
    });

    const token = jwt.sign(
      {
        id: receiver.id,
        email: receiver.email,
      },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "24h" }
    );

    console.log("receiver ====> ", receiver);
    const data = {
      message: "User created successfully",
      receiver,
      token,
    };
    res.status(200).send(data);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const receiver = await Receiver.findOne({ email });
    if (receiver) {
      const match = await bcrypt.compare(password, receiver.password);
      if (match) {
        const token = jwt.sign(
          {
            id: receiver.id,
            email: receiver.email,
          },
          process.env.ACCESS_TOKEN_KEY,
          { expiresIn: "24h" }
        );

        res.status(200).send({
          type: "receivers",
          match,
          token,
          receiverId: receiver._id,
          username: receiver.username,
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

  try {
    const updatedUser = await Receiver.findByIdAndUpdate(_id, {
      ...updateFields,
    }).populate("items");

    if (!updatedUser) {
      throw new MyError(404, "Receiver not found");
    }

    res.status(200).json({
      updatedUser,
      message: "successfully updated user",
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
        const userData = await Receiver.findOne({ email: email });
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
    const user = await Receiver.findByIdAndDelete({ _id });
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
};


exports.addItems = async (req, res) => {
  try {
    const { items } = req.body;
    const _id = req.params.id;
    const item = await Receiver.updateMany(
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