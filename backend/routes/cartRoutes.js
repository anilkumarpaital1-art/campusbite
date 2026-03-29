const { queryDebug } = require("../config/db")
const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  updateCart,
  removeFromCart
} = require("../controllers/cartController");

// ================= CART ROUTES =================

// ➕ Add item
router.post("/add", addToCart);

// 📦 Get cart (IMPORTANT)
router.get("/:userId", getCart);

// 🔄 Update quantity
router.post("/update", updateCart);

// ❌ Remove item
router.post("/remove", removeFromCart);

// 🔥 CLEAR CART BY CANTEEN
router.delete("/clear/:canteenId", async (req, res) => {
  try {
    const { canteenId } = req.params;
    const user_id = req.query.user_id; // 🔥 FIX

    if (!user_id || !canteenId) {
      return res.status(400).json({
        success: false,
        message: "Missing user_id or canteenId"
      });
    }

    await queryDebug(
      `DELETE c FROM cart c
      JOIN menu_items m ON c.menu_item_id = m.item_id
      WHERE c.user_id = ? AND m.canteen_id = ?`,
      [user_id, canteenId]
    );

    console.log("🔥 CART CLEARED:", user_id, canteenId);

    res.json({
      success: true,
      message: "Cart cleared for this canteen ✅"
    });

  } catch (err) {
    console.error("Clear Cart Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to clear cart ❌"
    });
  }
});

console.log("📦 Cart routes initialized");

module.exports = router;