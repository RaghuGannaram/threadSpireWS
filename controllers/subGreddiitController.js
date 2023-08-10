const subGreddiitService = require("../services/subGreddiitService");
const SubGreddiit = require("../models/SubGreddiit");

const getAllSubGreddiits = function (req, res, next) {
	subGreddiitService.getAllSubGreddiits(function (error, subGreddiits) {
		if (error) {
			error.status = 406;
			return next(error);
		}
		if (subGreddiits.length < 1) {
			console.log("checking2");
			return res.status(404).json({ message: "SubGreddiits not found" });
		}
		res.json({ subGreddiits: subGreddiits });
	});
};

const getUserSubGreddiits = function (req, res, next) {
	let userId = req.params.userId;

	subGreddiitService.getPostReports(userId, function (error, subGreddiits) {
		if (error) {
			error.status = 406;
			return next(error);
		}
		if (subGreddiits.length < 1) {
			return res.status(404).json({ message: "SubGreddiits not found" });
		}
		res.json({ subGreddiits: subGreddiits });
	});
};

const getSubGreddiitByID = function (req, res, next) {
	let subGreddiitId = req.params.subGrId;

	subGreddiitService.getSubGreddiitByID(subGreddiitId, function (err, subGreddiit) {
		if (err) {
			err.status = 404;
			return next(err);
		} else {
			res.json({ subGreddiit: subGreddiit });
		}
	});
};

const createSubGreddiit = function (req, res, next) {
	
	let { userId, title, description, tags, banned } = req.body;
	let followers = [].push(userId);

	tags = tags.split(",").map((tag) => tag.trim());
	banned = banned.split(",").map((ban) => ban.trim());

	let newSubGreddiit = new SubGreddiit({ title, description, tags, banned, followers });

	subGreddiitService.createSubGreddiit(newSubGreddiit, function (err, data) {
		if (err) return next(err);
		return res.status(200).json({ message: data });
	});
};

const deleteSubGreddiit = function (req, res, next) {
	let subGreddiitId = req.params.subGrId;

	subGreddiitService.deleteSubGreddiit(subGreddiitId, function (err, data) {
		if (err) return next(err);
		return res.json({ message: data });
	});
};

module.exports = { getAllSubGreddiits, getUserSubGreddiits, getSubGreddiitByID, createSubGreddiit, deleteSubGreddiit };
