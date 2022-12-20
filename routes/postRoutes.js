const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();


// @route GET && POST  - /posts/
router
	.route("/")
	.get(postController.getAllPosts)
	.post(postController.createNewPost);

router
	.route("/:id")
	.get(postController.getPostById);

module.exports = router;