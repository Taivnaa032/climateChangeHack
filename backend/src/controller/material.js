const Material = require("../model/materials");

exports.getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find({}).populate("items");
    res.status(200).send({ materials });
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.getMaterial = async (req, res) => {
  try {
    const _id = req.params.id;
    const materials = await Material.find({ _id }).populate("items");
    res.status(200).json(materials);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = req.params.item;
    const result = await Material.find({ items }).populate("items");
    res.status(200).json(result);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.addItems = async (req, res) => {
  try {
    const _id = req.params.id;
    const { items } = req.body;
    const material = await Material.updateMany(
      { _id },
      {
        $push: { items },
      }
    );
    res.status(200).json(material);
  } catch (error) {
    res.status(404).send(error);
  }
};
