const Inventory = require("../models/inventory");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const { notifyInventoryUpdate } = require("../utils");

// to create inventory in bulk
const createInBulk = async (req, res) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      throw new CustomError.BadRequestError(
        "The items property must be an array."
      );
    }

    // this just adds new items to the database irrespective of whether they are already present in the database or not
    // const createdItems = await Inventory.insertMany(items);

    for (const item of items) {
      const { name, price, available_units, display_image_url } = item;
      const existingItem = await Inventory.findOne({ name });
      if (existingItem) {
        // if the item is already present in the database, update the available units
        existingItem.available_units += Number(available_units);
        existingItem.price = price || existingItem.price;
        existingItem.display_image_url =
          display_image_url || existingItem.display_image_url;
        await existingItem.save();
      } else {
        // if the item is not present in the database, add it
        await Inventory.create({
          name,
          price,
          available_units,
          display_image_url,
        });
      }
    }
    notifyInventoryUpdate();
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Items added successfully" });
  } catch (err) {
    console.log("Bulk create error", err);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// update item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Inventory.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      throw new CustomError.NotFoundError(`No item found with id: ${id}`);
    }
    notifyInventoryUpdate();

    res.status(StatusCodes.OK).json({ item });
  } catch (err) {
    console.log("update item error", err);
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

module.exports = { createInBulk, updateItem };
