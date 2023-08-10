const SubGreddiit = require("../models/SubGreddiit");

const getAllSubGreddiits = function (callback) {
	SubGreddiit.find({}, callback);
};

const getUserSubGreddiits = function (userId, callback) {
	SubGreddiit.find({ userId: userId }, callback);
};

const getSubGreddiitByID = function (subGrId, callback) {
	SubGreddiit.findById(subGrId, callback);
};

const createSubGreddiit = function (newSubGreddiit, callback) {
	newSubGreddiit.save(newSubGreddiit, callback);
};

const deleteSubGreddiit = function (subGrId, callback) {
	SubGreddiit.deleteOne({_id: subGrId}, callback);
};

module.exports = {
	getAllSubGreddiits,
	getUserSubGreddiits,
	getSubGreddiitByID,
	createSubGreddiit,
	deleteSubGreddiit,
};
