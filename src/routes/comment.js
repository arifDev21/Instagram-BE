const express = require('express');
const commentController = require('../controllers/commentController');
const route = express.Router();

route.get('/', commentController.getAll.bind(commentController));
route.get('/:postid', commentController.getByPostId.bind(commentController));
route.post('/', commentController.addComment.bind(commentController));

module.exports = route;
