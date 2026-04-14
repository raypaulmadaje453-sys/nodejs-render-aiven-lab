const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Your specific Aiven credentials integrated directly
const pool = mysql.createPool({
  host: 'mysql-32635dc5-mysql-lab-project-madaje.e.aivencloud.com',
  user: 'avnadmin',
  password: 'AVNS_10MwJdIIZmkNywQy6H-', // Ensure no spaces before or after
  database: 'defaultdb',
  port: 15645,
  ssl: {
    rejectUnauthorized: false 
  },
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// This prevents the "Unhandled error event" crash you're seeing
pool.on('error', (err) => {
  console.error('Database Pool Error:', err.message);
});

const db = pool.promise();

app.get('/', (req, res) => {
  res.send('Database Connected Successfully: Tue Apr14 2026 04:12:11 GMT+0000(Coordinated Univeral Time)');
});

app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json({ success: true, message: "Connected!", data: rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server successfully started on port ${PORT}`);
});
