const Item = require("../model/items");
const User = require("../model/users");
const Receiver = require("../model/receivers");

exports.getAllItems = async (req, res) => {
  try {
    let query = {};

    // Check if there is a query parameter named 'id' and it's not 'all'
    if (req.query.id && req.query.id !== "all") {
      query._id = req.query.id;
    }

    const items = await Item.find(query).populate("owners");
    res.status(200).send(items);
  } catch (error) {
    console.error("Error in getAllItems:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.getId = async (req, res) => {
  const _id = req.params.id;
  try {
    const item = await Item.findById({ _id });
    res.status(200).send(item);
  } catch (error) {
    res.status(404).send({ error: "Internal Server Error" });
  }
};

exports.getItemByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const item = await Item.find({ title });
    res.status(200).send(item);
  } catch (error) {
    console.error("Error in getAllItems:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

exports.getUsersByItem = async (req, res) => {
  try {
    const _id = req.params.id;
    const items = await Item.findById(_id).populate("owners");
    res.status(200).send(items.owners);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.getItemsByMaterial = async (req, res) => {
  try {
    const { material } = req.params;
    const items = await Item.find({
      material,
    });
    res.status(200).send({ items });
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.addOwner = async (req, res) => {
  try {
    const _id = req.params.id;
    const { owner } = req.body;
    const ownerAdded = await Item.updateMany(
      { _id },
      {
        $push: { owners: owner },
      }
    );
    res.status(200).send(ownerAdded);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.addReceiver = async (req, res) => {
  try {
    const _id = req.params.id;
    const { receiver } = req.body;
    const receiverAdded = await Item.updateMany(
      { _id },
      {
        $push: { receivers: receiver },
      }
    );
    res.status(200).send(receiverAdded);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.searchUsers = async (req, res) => {
  const itemId = req.params.id;
  try {
    const query = {
      items: {
        $elemMatch: {
          item: itemId,
        },
      },
    };
    const users = await User.find(query).populate("items.item");
    res.status(200).send(users);
  } catch (err) {
    req.status(404).send(err);
  }
};

exports.searchReceivers = async (req, res) => {
  const itemId = req.params.id;
  try {
    const query = {
      items: {
        $elemMatch: {
          item: itemId,
        },
      },
    };
    const receivers = await Receiver.find(query).populate("items.item");
    res.status(200).send(receivers);
  } catch (err) {
    req.status(404).send(err);
  }
};

exports.searchUsersByMaterial = async (req, res) => {
  const materials = req.params.material;
  try {
    const users = await User.find({ materials });
    res.status(200).send(users);
  } catch (err) {
    req.status(404).send(err);
  }
};

exports.searchReceiversByMaterial = async (req, res) => {
  const materials = req.params.material;
  try {
    const receivers = await Receiver.find({ materials });
    res.status(200).send(receivers);
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.createItem = async (req, res) => {
  const { owners, receivers, title, material } = req.body;
  try {
    const item = await Item.create({
      owners,
      receivers,
      title,
      material,
    });
    res.status(200).json(item);
  } catch (error) {
    res.status(404).send(error);
  }
};
