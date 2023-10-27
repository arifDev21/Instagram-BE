const authRoutes = require('./auth');
const PostRoutes = require('./post');
const commentRoutes = require('./comment');
const postlikeRoutes = require('./postlike');
const followRoutes = require('./follow');
const messageRoutes = require('./message');

const routers = {
 authRoutes,
 PostRoutes,
 commentRoutes,
 postlikeRoutes,
 followRoutes,
 messageRoutes
};

module.exports = routers;
