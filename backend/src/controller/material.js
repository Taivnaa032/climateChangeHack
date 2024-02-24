const Material = require("../model/materials");

exports.getItems = async (req, res) => {
  try {
    const { item } = req.params;
    const items = await Material.find({ item }).populate("items");
    res.status(200).json(items);
  } catch (error) {
    res.status(404).send(error);
  }
};
