const express = require("express");
const router = express.Router();

const {
  getStats,
  getRecentOrders,
  updateOrderStatus
} = require("../controllers/vendorDashboardController");

/* ================= ROUTES ================= */

// Stats
router.get("/:canteen_id", getStats);

// Orders
router.get("/orders/:canteen_id", getRecentOrders);

// Update order status
router.patch("/order/:id", updateOrderStatus);

module.exports = router;