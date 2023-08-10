const postService = require("../services/postService");
const Post = require("../models/Post");

const getAllPosts = function (req, res, next) {
	postService.getAllPosts(function (error, posts) {
		if (error) {
			error.status = 406;
			return next(error);
		}
		if (posts.length < 1) {
			return res.status(404).json({ message: "Posts not found" });
		}
		res.json({ posts: posts });
	});
};

const getUserPosts = function (req, res, next) {
	let subGrid = req.params.userId;

	postService.getUserPosts(subGrid, function (error, posts) {
		if (error) {
			error.status = 406;
			return next(error);
		}
		if (posts.length < 1) {
			return res.status(404).json({ message: "Posts not found" });
		}
		res.json({ posts: posts });
	});
};

const getPostByID = function (req, res, next) {
	let postId = req.params.postId;

	postService.getPostByID(postId, function (err, post) {
		if (err) {
			err.status = 404;
			return next(err);
		} else {
			res.json({ post: post });
		}
	});
};

const createPost = function (req, res, next) {
	let { userId, subGrId, content } = req.body;

	let newPost = new Post({ userId, subGrId, content });
	postService.createPost(newPost, function (err, data) {
		if (err) return next(err);
		return res.status(200).json({ message: data });
	});
};

const deletePost = function (req, res, next) {
	let postId = req.params.postId;

	postService.deletePost(postId, function (err, data) {
		if (err) return next(err);
		return res.json({ message: data });
	});
};

module.exports = { getAllPosts, getUserPosts, getPostByID, createPost, deletePost };
