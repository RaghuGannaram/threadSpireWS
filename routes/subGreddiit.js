const express = require("express");
const subGreddiitController = require("../controllers/subGreddiitController");

const router = express.Router();

router.get("/all", subGreddiitController.getAllSubGreddiits);

router.get("/user/:userId", subGreddiitController.getUserSubGreddiits);

router.get("/details/:subGrId", subGreddiitController.getSubGreddiitByID);

router.post("/new", subGreddiitController.createSubGreddiit);

router.delete("/delete/:subGrId", subGreddiitController.deleteSubGreddiit);

module.exports = router;
