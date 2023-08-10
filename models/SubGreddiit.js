const mongoose = require("mongoose");

const subGreddiitSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: [true, "title is required, received {VALUE}"],
		},
		description: {
			type: String,
			required: [true, "description is required, received {VALUE}"],
		},
		tags: {
			type: [String],
			default: [],
		},
		banned: {
			type: [String],
			default: [],
		},
		followers: {
			type: [String],
			default: [],
		},
		joiningRequests: {
			type: [String],
			default: [],
		},
		posts: {
			type: [String],
			default: [],
		},
		reports: {
			type: [String],
			default: [],
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{
		collection: "subGreddiitCollection",
		autoIndex: true,
		optimisticConcurrency: true,
		bufferTimeoutMS: 10000,
		timestamps: true,
	}
);

const SubGreddiit = mongoose.model("SubGreddiit", subGreddiitSchema);
module.exports = SubGreddiit;
