require('dotenv').config();
const { db_username, db_password, db_database, db_host, db_dialect, db_port } =
  process.env;
module.exports = {
  development: {
    // username: process.env.MYSQL_USER,
    // password: process.env.MYSQL_PASSWORD,
    // database: process.env.MYSQL_DATABASE,
    // host: process.env.MYSQL_HOST,
    // dialect: process.env.MYSQL_DIALECT,

    username: db_username,
    password: db_password,
    database: db_database,
    host: db_host,
    dialect: db_dialect,
    port: db_port,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    dialect: process.env.MYSQL_DIALECT,
  },
};
