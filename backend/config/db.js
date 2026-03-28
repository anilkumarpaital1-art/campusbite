require("dotenv").config();
const mysql = require("mysql2/promise");

// Create pool using ENV (BEST PRACTICE 🔥)
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "2006",
  database: process.env.DB_NAME || "campusbite",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection (AUTO CHECK ✅)
(async () => {
  try {
    const connection = await db.getConnection();
    console.log("✅ MySQL Connected Successfully");
    connection.release();
  } catch (err) {
    console.error("❌ DB Connection Failed:", err.message);
    process.exit(1); // stop server if DB fails 🔥
  }
})();

module.exports = db;