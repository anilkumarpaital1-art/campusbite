console.log("✅ ORDER ROUTES FILE LOADED");
const express = require("express");
const router = express.Router();

const { 
  placeOrder, 
  getOrdersByUser 
} = require("../controllers/orderController");

// ✅ CREATE ORDER (FIXED)
router.post("/create", placeOrder);

// ✅ GET ORDERS
router.get("/:userId", getOrdersByUser);


router.post("/create", (req, res) => {
  console.log("🔥 HIT CREATE ORDER");
  res.send("WORKING");
});

module.exports = router;