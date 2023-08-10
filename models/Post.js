const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		userId:{
			type: String,
			required: [true, "userId is required, received {VALUE}"],
		},
		content: {
			type: String,
			required: [true, "content is required, received {VALUE}"],
		},
		subGrId: {
			type: String,
			required: [true, "subGreddiit is required, received {VALUE}"],
		},
		upVotes: {   
			type: Number,
			default: 0,
		},
		downVotes: {
			type: Number,
			default: 0,
		},
		date: {
			type: Date,
			default: Date.now,
		},
	},
	{
		collection: "postCollection",
		autoIndex: true,
		optimisticConcurrency: true,
		bufferTimeoutMS: 10000,
		timestamps: true,
	}
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
