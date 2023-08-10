const Report = require("../models/Report");

const getAllReports = function (callback) {
	Report.find({}, callback);
};

const getPostReports = function (subGrid, callback) {
	Report.find({ subGrid: subGrid }, callback);
};

const getReportByID = function (reportId, callback) {
	Report.findById(reportId, callback);
};

const createReport = function (newReport, callback) {
	newReport.save(newReport, callback);
};

const deleteReport = function (reportId, callback) {
	Report.deleteOne({ _id: reportId }, callback);
};

module.exports = {
	getAllReports,
	getPostReports,
	getReportByID,
	createReport,
	deleteReport,
};
