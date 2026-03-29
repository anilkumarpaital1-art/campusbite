require("dotenv").config();
const mysql = require("mysql2/promise");

// 🔍 DEBUG: Check if MYSQL_URL exists
console.log("🧪 DB CONFIG DEBUG:");
console.log({
  usingURL: process.env.MYSQL_URL ? "YES ✅" : "NO ❌",
});

// ✅ Create pool using MYSQL_URL
const db = mysql.createPool({
  uri: process.env.MYSQL_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false, // Needed for Railway MySQL SSL
  },
});

// 🔍 DEBUG: Pool creation confirmation
console.log("🧪 MySQL Pool created using MYSQL_URL");

// Test connection
(async () => {
  try {
    console.log("⏳ Attempting DB connection...");

    const connection = await db.getConnection();

    console.log("✅ MySQL Connected Successfully");

    // 🔍 DEBUG: Connection thread info
    console.log("🧪 Connection Thread ID:", connection.threadId);

    connection.release();
    console.log("🔁 Connection released back to pool");

  } catch (err) {
    console.error("❌ DB Connection Failed");
    
    // 🔍 DETAILED ERROR DEBUG
    console.error("🧪 Error Message:", err.message);
    console.error("🧪 Error Code:", err.code);
    console.error("🧪 Error Errno:", err.errno);
    console.error("🧪 SQL State:", err.sqlState);
    console.error("🧪 Stack Trace:", err.stack);

    // 🔍 Common hints
    if (!process.env.MYSQL_URL) {
      console.error("💡 Hint: MYSQL_URL is missing in .env");
    }
    if (err.code === "ER_ACCESS_DENIED_ERROR") {
      console.error("💡 Hint: Wrong credentials inside MYSQL_URL");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("💡 Hint: DB not reachable / wrong host");
    }

    process.exit(1);
  }
})();

// 🔍 OPTIONAL: Query wrapper for debugging
async function queryDebug(sql, params = []) {
  try {
    console.log("📌 Executing Query:", sql);
    console.log("📌 Params:", params);

    const [rows] = await db.execute(sql, params);

    console.log("✅ Query Success. Rows:", rows.length);

    return rows;
  } catch (err) {
    console.error("❌ Query Failed");
    console.error("🧪 SQL:", sql);
    console.error("🧪 Params:", params);
    console.error("🧪 Error:", err.message);
    throw err;
  }
}

module.exports = {
  db,
  queryDebug
};