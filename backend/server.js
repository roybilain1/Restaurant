const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'restaurant'
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected");
});

app.get("/restaurant", (req, res) => {
  db.query("SELECT * FROM restaurant", (err, results) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    res.json(results);
  });
});

// GET all sections
app.get("/api/sections", (req, res) => {
  const sql = `SELECT * FROM sections ORDER BY display_order`;

  db.query(sql, (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

// GET all foods
app.get("/api/foods", (req, res) => {
  const sql = `SELECT * FROM foods ORDER BY section_id, display_order`;

  db.query(sql, (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});

app.listen(3001, () => console.log("Server running in http://localhost:3001"));