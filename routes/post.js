const express = require("express");
const postController = require("../controllers/postController");

const router = express.Router();

router.get("/all", postController.getAllPosts);

router.get("/sub-greddiit/:subGrId", postController.getUserPosts);

router.get("/details/:postId", postController.getPostByID);

router.post("/", postController.createPost);

router.delete("/:postId", postController.deletePost);

module.exports = router;
