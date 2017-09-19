const mysql = require('mysql');
require('dotenv').config();

/*
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

let sql = `CREATE DATABASE ${process.env.DB_NAME}`;

db.query(sql, (err, result) => {
  if(err) throw err;
  console.log(result);
  console.log('Database created');
});*/

let sql = `CREATE TABLE users(
          id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
          username varchar(20),
          email varchar(100),
          password binary(60));`;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if(err) throw err;
  console.log('MySQL connected');
});

db.query(sql, (err, result) => {
  if(err) throw err;
  console.log(result);
  console.log('Table created');
})
