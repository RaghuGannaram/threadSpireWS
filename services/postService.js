const Post = require("../models/Post");

const getAllPosts = function (callback) {
	Post.find({}, callback);
};

const getUserPosts = function (subGrid, callback) {
	Post.find({ subGrid: subGrid }, callback);
};

const getPostByID = function (postId, callback) {
	Post.findById(postId, callback);
};

const createPost = function (newPost, callback) {
	console.log("checking")
	newPost.save(newPost, callback);
};

const deletePost = function (postId, callback) {
	Post.deleteOne({ _id: postId }, callback);
};

module.exports = {
	getAllPosts,
	getUserPosts,
	getPostByID,
	createPost,
	deletePost,
};
