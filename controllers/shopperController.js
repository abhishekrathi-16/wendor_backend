const Inventory = require("../models/inventory");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

// to get all inventory items
const getAllInventory = async (req, res) => {
  const items = await Inventory.find({ available_units: { $gt: 0 } });
  res.status(StatusCodes.OK).json({ items, count: items.length });
};

// buy an inventory item
const buyItem = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const item = await Inventory.findOne({ _id: id });
  if (!item) {
    throw new CustomError.NotFoundError(`Item with id ${id} not found`);
  }
  if (item.available_units >= quantity) {
    item.available_units -= quantity;
    // if(item.available_units===0) await item.deleteOne();
    // else await item.save();
    await item.save();
    res.status(StatusCodes.OK).json({ message: "Item bought successfully" });
  }else{
    res.status(StatusCodes.BAD_REQUEST).json({ message: "Insufficient stock" });
  }
};

module.exports = { getAllInventory, buyItem }