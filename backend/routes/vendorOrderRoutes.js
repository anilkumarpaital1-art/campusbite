const express = require("express");
const router = express.Router();

const {
  getVendorOrders,
  updateVendorOrderStatus
} = require("../controllers/vendorOrderController");

router.get("/:canteen_id", getVendorOrders);
router.put("/status/:order_id", updateVendorOrderStatus);

module.exports = router;