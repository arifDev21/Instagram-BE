const http = require('http');
const { Server } = require('socket.io');

const io = (app) => {
 const server = http.createServer(app);
 return new Server(server, { cors: { origin: '*' } });
};
module.exports = io;
