const express = require('express')
const router = express.Router()

const { buyItem, getAllInventory } = require("../controllers/shopperController")

router.route("/inventory").get(getAllInventory);
router.route("/inventory/:id/buy").post(buyItem);

module.exports = router;