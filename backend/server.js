const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'restaurant'
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

app.get("/students", (req, res) => {
  const search = req.query.search || "";

  const sql = `SELECT * FROM restaurant`;

  db.query(
    sql,
    [`%${search}%`, `%${search}%`, `%${search}%`],
    (err, result) => {
      if (err) return res.json({ error: err });
      res.json(result);
    }
  );
});

