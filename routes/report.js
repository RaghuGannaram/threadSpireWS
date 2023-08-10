const express = require("express");
const reportController = require("../controllers/reportController");

const router = express.Router();

router.get("/all", reportController.getAllReports);

router.get("/sub-greddiit/:subGrId", reportController.getPostReports);

router.get("/details/:reportId", reportController.getReportByID);

router.post("/", reportController.createReport);

router.delete("/:reportId", reportController.deleteReport);

module.exports = router;
