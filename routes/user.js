const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/all", userController.getAllUsers);

router.get("/details/:userId", userController.getUserByID);

router.put("/update/:userId", userController.updateUser);

module.exports = router;
