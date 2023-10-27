const express = require('express');
const followController = require('../controllers/followController');
const route = express.Router();

route.get('/', followController.getAll.bind(followController));
route.post(
 '/followers/:username',
 followController.getFollowersByUsername.bind(followController)
);
route.post(
 '/following/:username',
 followController.getFollowingByUsername.bind(followController)
);
route.post('/', followController.follow.bind(followController));

module.exports = route;
