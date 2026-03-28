const express = require("express");
const router = express.Router();

const {
  getMenu,
  addMenuItem,
  toggleAvailability
} = require("../controllers/menuController");

/* ================= DEBUG ROUTE ================= */

// 🔥 DEBUG: Check if route is hit + param coming correctly
router.get("/:restaurantId", (req, res, next) => {
  console.log("🚀 ROUTE HIT");
  console.log("👉 PARAMS:", req.params);   // VERY IMPORTANT
  next(); // continue to controller
}, getMenu);

/* ================= OTHER ROUTES ================= */

router.post("/add", (req, res, next) => {
  console.log("➕ ADD ITEM ROUTE HIT");
  console.log("👉 BODY:", req.body);
  next();
}, addMenuItem);

router.post("/toggle", (req, res, next) => {
  console.log("🔄 TOGGLE ROUTE HIT");
  console.log("👉 BODY:", req.body);
  next();
}, toggleAvailability);

module.exports = router;