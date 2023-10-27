const express = require('express');
const messageController = require('../controllers/messageController');
const route = express.Router();
route.get('/', messageController.getMessages.bind(messageController));
route.post('/', messageController.postMessage.bind(messageController));

module.exports = route;
