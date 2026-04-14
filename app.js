const express = require("express");
const mysql = require("mysql2");

const app = express();

const db = mysql.createConnection({
  host: "mysql-32635dc5-mysql-lab-project-madaje.e.aivencloud.com",
  user: "avnadmin",
  password: "<redacted>",
  database: "defaultdb",
  port: "15645"
});

app.get("/", (req, res) => {
  db.query("SELECT NOW()", (err, result) => {
    if(err) throw err;
    res.send("Database Connected Successfully: " + result[0]["NOW()"]);
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});