require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const { queryDebug } = require("./config/db")

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://your-frontend.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

// ✅ STATIC FILES
app.use("/images", express.static(path.join(__dirname, "images")));

/* ================= GLOBAL DEBUG ================= */

// 🔥 LOG EVERY REQUEST
app.use((req, res, next) => {
  console.log("=================================");
  console.log("🌐 REQUEST:", req.method, req.url);
  next();
});

console.log("🚀 Loading routes...");

/* ================= ROUTES ================= */

const authRoutes = require("./routes/authRoutes.js");
const restaurantRoutes = require("./routes/restaurantRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const vendorRoutes = require("./routes/vendor.js");
const paymentRoutes = require("./routes/paymentRoutes.js");
const vendorMenuRoutes = require("./routes/vendorMenuRoutes");
const vendorDashboardRoutes = require("./routes/vendorDashboardRoutes");
const vendorOrderRoutes = require("./routes/vendorOrderRoutes");

// ✅ DEBUG: Confirm routes loaded
console.log("✅ Routes loaded");

/* ================= API ROUTES ================= */

app.use("/api/auth", authRoutes);
app.use("/api/restaurants", restaurantRoutes);

// 🔥 IMPORTANT: DEBUG MENU ROUTE
app.use("/api/menu", (req, res, next) => {
  console.log("🍽 MENU ROUTE HIT");
  next();
}, menuRoutes);

app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/vendor-menu", vendorMenuRoutes);
app.use("/api/vendor-orders", vendorOrderRoutes);
app.use("/api/vendor-dashboard", vendorDashboardRoutes);
app.use("/api/payment", paymentRoutes);

/* ================= TEST ROUTES ================= */

app.get("/api/cart-test", (req, res) => {
  res.send("Cart route working ✅");
});

app.get("/", (req, res) => {
  res.send("🚀 CampusBite Backend Running");
});

/* ================= DB DEBUG ================= */

// 🔥 VERY IMPORTANT DEBUG
app.get("/debug-db", async (req, res) => {
  try {
    const [dbName] = await queryDebug("SELECT DATABASE() as db");
    const [count] = await queryDebug("SELECT COUNT(*) as total FROM menu_items");

    res.json({
      database: dbName[0].db,
      totalMenuItems: count[0].total
    });

  } catch (err) {
    res.json({ error: err.message });
  }
});

/* ================= DB TEST ================= */

app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await queryDebug("SELECT 1");

    res.json({
      success: true,
      message: "DB Connected ✅",
      data: rows
    });

  } catch (err) {
    console.error("DB Error:", err.message);

    res.status(500).json({
      success: false,
      message: "DB Connection Failed ❌"
    });
  }
});

app.get('/favicon.ico', (req, res) => res.status(204));

/* ================= 404 ================= */

app.use((req, res) => {
  console.log("❌ Route Not Found:", req.method, req.url);

  res.status(404).json({
    success: false,
    message: "Route Not Found ❌"
  });
});

/* ================= ERROR HANDLER ================= */

app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error ❌"
  });
});

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});