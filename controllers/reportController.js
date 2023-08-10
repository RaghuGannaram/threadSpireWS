const reportService = require("../services/reportService");
const Report = require("../models/Report");

const getAllReports = function (req, res, next) {
	reportService.getAllReports(function (error, reports) {
		if (error) {
			error.status = 406;
			return next(error);
		}
		if (reports.length < 1) {
			return res.status(404).json({ message: "Reports not found" });
		}
		res.json({ reports: reports });
	});
};

const getPostReports = function (req, res, next) {
	reportService.getPostReports(subGrid, function (error, reports) {
		if (error) {
			error.status = 406;
			return next(error);
		}
		if (reports.length < 1) {
			return res.status(404).json({ message: "Reports not found" });
		}
		res.json({ reports: reports });
	});
};

const getReportByID = function (req, res, next) {
	let reportId = req.params.reportId;

	reportService.getReportByID(reportId, function (err, report) {
		if (err) {
			err.status = 404;
			return next(err);
		} else {
			res.json({ report: report });
		}
	});
};

const createReport = function (req, res, next) {
	let { userId, subGrId, concern, postId } = req.body;

	let newReport = new Report({ reporter: userId, concern,subGrId, postId, reported: userId });
	reportService.createReport(newReport, function (err, data) {
		if (err) return next(err);
		return res.status(200).json({ message: data });
	});
};

const deleteReport = function (req, res, next) {
	let reportId = req.params.reportId;

	reportService.deleteReport(reportId, function (err, data) {
		if (err) return next(err);
		return res.json({ message: data });
	});
};

module.exports = { getAllReports, getPostReports, getReportByID, createReport, deleteReport };
