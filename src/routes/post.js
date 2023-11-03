const express = require('express');
const postController = require('../controllers/postController');
const check_verified = require('../middlewares/auth');
const { fileUploader } = require('../middlewares/multer');
const route = express.Router();

route.get('/', postController.getPosts.bind(postController));
route.get(
  '/user/:userid',
  postController.getPostsByUserId.bind(postController)
);
route.get('/search', postController.getPostByFilter.bind(postController));
route.get('/:id', postController.getById.bind(postController));
route.delete(
  '/:id',

  postController.deleteById.bind(postController)
);
route.patch(
  '/:id',

  fileUploader({
    destinationFolder: 'post',
    prefix: 'POST',
    filetype: 'image',
  }).single('image'),
  postController.editPost.bind(postController)
);
route.post(
  '/',

  fileUploader({
    destinationFolder: 'post',
    prefix: 'POST',
    filetype: 'image',
  }).single('image'),
  postController.createPost.bind(postController)
);

module.exports = route;
