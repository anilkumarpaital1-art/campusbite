const express = require("express");
const router = express.Router();

const {
  addItem,
  toggleAvailability
} = require("../controllers/vendorMenuController");

/* ================= VENDOR MENU ACTIONS ================= */

// ✅ Add item
router.post("/add", addItem);

// ✅ Toggle availability
router.post("/toggle", toggleAvailability);

module.exports = router;