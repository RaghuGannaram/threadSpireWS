const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const userService = require("../services/userService");
const config = require("../configs/token.config");
const User = require("../models/User");
const CustomError = require("../utils/customError");

const registerUser = function (req, res, next) {
	const { firstname, lastname, username, email, password, verifyPassword } = req.body;

	check("firstname").notEmpty().withMessage("First name is required");
	check("lastname").notEmpty().withMessage("Last name is required");
	check("username").notEmpty().withMessage("username is required");
	check("email").notEmpty().withMessage("Email is required");
	check("password").notEmpty().withMessage("Password is required");
	check("verifyPassword").notEmpty().withMessage("verifyPassword is required");

	let missingFieldErrors = validationResult(req);
	if (!missingFieldErrors.isEmpty()) {
		let customError = new CustomError("Registration Error", 400, "missing_field", { errors: missingFieldErrors });
		return next(customError);
	}

	check("email").isEmail().withMessage("Email is not valid");
	check("password").equals(verifyPassword).withMessage("Passwords have to match");

	let invalidFieldErrors = validationResult(req);
	if (!invalidFieldErrors.isEmpty()) {
		let customError = new CustomError("Signin Error", 400, "invalid_field", { errors: invalidFieldErrors });
		return next(customError);
	}

	let newUser = new User({ firstname, lastname, username, email, password });

	userService.getUserByEmail(email, function (err, user) {
		if (err) return next(err);
		if (user) {
			let customError = new CustomError("Registration Error", 409, "invalid_field", { message: "Already registered, Please login..." });
			return next(customError);
		} else {
			userService.createUser(newUser, function (err, user) {
				if (err) return next(err);
				let token = jwt.sign({ email: email }, config.secret, { expiresIn: "7d" });
				res.status(201).json({
					message: "User registered successfully..!",
					data: {
						userId: user.id,
						username: user.username,
						token: token,
						expiresIn: "7d",
					},
				});
			});
		}
	});
};

const loginUser = function (req, res, next) {
	const { email, password } = req.body || {};
	if (!email || !password) {
		let customError = new CustomError("Login Error", 400, "missing_field", { message: "Missing username or password" });
		return next(customError);
	}

	userService.getUserByEmail(email, function (err, user) {
		if (err) return next(err);
		if (!user) {
			let err = new CustomError("Login Error", 403, "invalid_field", { message: "Incorrect email or password" });
			return next(err);
		}
		userService.comparePassword(password, user.password, function (err, isMatch) {
			if (err) return next(err);
			if (isMatch) {
				let token = jwt.sign({ email: email }, config.secret, { expiresIn: "7d" });
				res.status(200).json({
					data: {
						userId: user.id,
						username: user.username,
						firstname: user.firstname,
						lastname: user.lastname,
						email: user.email,
						token: token,
						expiresIn: "7d",
					},
				});
			} else {
				let customError = new CustomError("Login Error", 403, "invalid_field", { message: "Incorrect email or password" });
				return next(customError);
			}
		});
	});
};

const getAllUsers = function (req, res, next) {
	userService.getAllUsers(function (error, users) {
		if (error) {
			error.status = 406;
			return next(error);
		}
		if (users.length < 1) {
			return res.status(404).json({ message: "Users not found" });
		}
		res.json({ users: users });
	});
};

const getUserByID = function (req, res, next) {
	let userId = req.params.userId;

	userService.getUserByID(userId, function (err, user) {
		if (err) {
			err.status = 404;
			return next(err);
		} else {
			res.json({ user: user });
		}
	});
};
const updateUser = function (req, res, next) {
	let { userId, updateData} = req.body;

	userService.updateUser(userId, updateData, function (err, user) {
		if (err) {
			err.status = 404;
			return next(err);
		} else {
			res.json({ user: user });
		}
	});
};

module.exports = { registerUser, loginUser, getAllUsers, getUserByID, updateUser };
