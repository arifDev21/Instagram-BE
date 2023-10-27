const express = require('express');
const postlikeController = require('../controllers/postlikeController');
const route = express.Router();

route.get('/', postlikeController.getAll.bind(postlikeController));
route.get(
 '/posts/:postid',
 postlikeController.getByPostId.bind(postlikeController)
);
route.get(
 '/users/:userid',
 postlikeController.getByUserId.bind(postlikeController)
);

route.post('/', postlikeController.like.bind(postlikeController));

module.exports = route;
