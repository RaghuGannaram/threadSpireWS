const jwt = require("jsonwebtoken");
const config = require("../configs/token.config");
const CustomError = require("../utils/customError");

function verifyToken(req, res, next) {
	let token = "";
	if (req.headers["authorization"]) {
		token = req.headers["authorization"];
	}
	if (token.startsWith("Bearer ")) {
		token = token.slice(7, token.length);
	}
	if (token) {
		jwt.verify(token, config.secret, (err, decoded) => {
			if (err) {
				let err = new CustomError("Token Error", 401, "invalid_field", { message: "Token is not valid" });
				return next(err);
			} else next();
		});
	} else {
		let err = new CustomError("Token Error", 401, "invalid_field", { message: "Token is not supplied" });
		return next(err);
	}
}

module.exports = verifyToken;
