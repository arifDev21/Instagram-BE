const {
  authRoutes,
  PostRoutes,
  commentRoutes,
  postlikeRoutes,
  followRoutes,
  messageRoutes,
} = require('./routes');

require('dotenv').config();
// const { db_username, db_password, db_database, db_host, db_dialect, db_port } =
//   process.env;

const {
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE,
  MYSQL_HOST,
  MYSQL_DIALECT,
  MYSQL_PORT,
} = process.env;
const express = require('express');
const PORT = process.env.PORT || 2000;
const app = express();
const cors = require('cors');
const db = require('./models');
const bearerToken = require('express-bearer-token');
const mysql = require('mysql2');

const options = {
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  database: MYSQL_DATABASE,
};
// console.log(options);
// const options = {
//   host: db_host,
//   port: db_port,
//   user: db_username,
//   password: db_password,
//   database: db_database,
// };
const connection = mysql.createConnection(options);

async function connectToDatabase() {
  try {
    await connection.connect();
    console.log('connecting to the database');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

connectToDatabase();
console.log(options);
//socket io
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const routers = require('./routes');
const io = new Server(server, { cors: { origin: '*' } });
global.io = io;
module.exports = { io };

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('NEW_MESSAGE', (data) => {
    // Assuming 'messages' is an array defined outside this function
    messages.push(data);
    io.emit('INIT_MESSAGES', messages); // Emit the updated message to all connected clients
  });

  // Send messages on user connection
  socket.emit('INIT_MESSAGES', messages);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bearerToken());
app.use('/auth', authRoutes);
app.use('/posts', PostRoutes);
app.use('/comments', commentRoutes);
app.use('/postlike', postlikeRoutes);
app.use('/follows', followRoutes);
app.use('/messages', messageRoutes);
app.use('/video', routers.videoRoutes);
app.use('/videolike', routers.videolikeRoutes);
app.use('/videocomment', routers.videocommentRoutes);

app.use('/public/avatars', express.static(`${__dirname}/public/images/avatar`));
app.use('/public/posts', express.static(`${__dirname}/public/images/post`));

app.get(
  '/udin',
  (req, res, next) => {
    res.send('udin');
    next();
  },
  (req, res) => {
    res.send('udin2');
  }
);

server.listen(PORT, () => {
  console.log(`listen on port ${PORT}`);
  // db.sequelize.sync({ alter: true });
});
