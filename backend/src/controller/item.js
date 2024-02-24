const Item = require("../model/items");
const User = require("../model/users");
const Receiver = require("../model/receivers");

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
    const users = await User.find(query);
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
    const receivers = await Receiver.find(query);
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
    req.status(404).send(err);
  }
};
