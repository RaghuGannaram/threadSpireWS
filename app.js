const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const { mongoURL, mongoOptions, connectCallback } = require("./configs/db.config");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const subGreddiitRouter = require("./routes/subGreddiit");
const postRouter = require("./routes/post");
const reportRouter = require("./routes/report");
const verifyToken = require("./middlewares/verifyToken");

const app = express();
dotenv.config();

mongoose.set("debug", true);
mongoose.connect(mongoURL, mongoOptions, connectCallback);

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", verifyToken, userRouter);
app.use("/api/v1/sub-greddiit", verifyToken, subGreddiitRouter);
app.use("/api/v1/post", verifyToken, postRouter);
app.use("/api/v1/report", verifyToken, reportRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	res.status(err.status || 500).json(err);
});

module.exports = app;
