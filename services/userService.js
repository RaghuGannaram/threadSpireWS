const User = require("../models/User");
var bcrypt = require("bcryptjs");

const getAllUsers = function (callback) {
	User.find(callback);
};

const getUserByID = function (id, callback) {
	User.findById(id, callback);
};

const getUserByEmail = function (email, callback) {
	User.findOne({ email: email }, callback);
};

const createUser = function (newUser, callback) {
	bcrypt.genSalt(10, function (err, salt) {
		if (err) throw err;
		bcrypt.hash(newUser.password, salt, function (err, hash) {
			newUser.password = hash;
			newUser.save(callback);
		});
	});
};

const comparePassword = function (givenPassword, hash, callback) {
	bcrypt.compare(givenPassword, hash, function (err, isMatch) {
		if (err) throw err;
		callback(null, isMatch);
	});
};

const updateUser = function (userId, updateData, callback) {
	User.findOneAndUpdate(
		{ _id: userId },
		{
			$set: {
				firstname: updateData.firstname,
				lastname: updateData.lastname,
				username: updateData.username,
			},
		},
		{ new: true },
		callback
	);
};

module.exports = {
	getAllUsers,
	getUserByID,
	getUserByEmail,
	createUser,
	comparePassword,
	updateUser,
};
