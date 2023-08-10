const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
	{
		postId: {
			type: String,
			required: [true, "postId is required, received {VALUE}"],
		},
		reporter: {
			type: String,
			required: [true, "reporter is required, received {VALUE}"],
		},
    reported: {
			type: String,
			required: [true, "reported is required, received {VALUE}"],
		},
		concern: {
			type: String,
			required: [true, "concern is required, received {VALUE}"],
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{
		collection: "reportCollection",
		autoIndex: true,
		optimisticConcurrency: true,
		bufferTimeoutMS: 10000,
		timestamps: true,
	}
);

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
