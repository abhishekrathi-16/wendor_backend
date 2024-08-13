const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentication");
const { createInBulk, updateItem } = require("../controllers/adminController");

router
  .route("/")
  .post([authenticateUser, authorizePermissions("admin")], createInBulk);

router
  .route("/:id")
  .patch([authenticateUser, authorizePermissions("admin")], updateItem);

module.exports = router;