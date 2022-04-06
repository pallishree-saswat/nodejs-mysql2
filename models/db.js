const mysql = require("mysql2/promise");

var connection = mysql.createPool({
  // host: "localhost",
  // user: "root",
  // database: "mock_project",
  // password: "password",

  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PSWD,
  port: process.env.DB_PORT,
});

module.exports = connection;
