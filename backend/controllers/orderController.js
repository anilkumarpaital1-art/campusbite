const db = require("../config/db");

/* ✅ PLACE ORDER */
exports.placeOrder = async (req, res) => {
  try {
    const { user_id, total_price, items } = req.body;

    if (!user_id || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data"
      });
    }

    // 🔥 1. INSERT ORDER
    const [orderResult] = await db.query(
      "INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, ?)",
      [user_id, total_price, "pending"]
    );

    const order_id = orderResult.insertId;

    // 🔥 2. INSERT ORDER ITEMS
    for (const item of items) {
      await db.query(
        "INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES (?, ?, ?, ?)",
        [order_id, item.item_id, item.quantity, item.price || 0]
      );
    }

    res.json({
      success: true,
      message: "Order placed successfully",
      order_id
    });

  } catch (err) {
    console.error("Order Error:", err);
    res.status(500).json({
      success: false,
      message: "Order failed"
    });
  }
};


/* ✅ GET ORDERS BY USER */
exports.getOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // ✅ FIX 1: comma added
    const [orders] = await db.query(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY order_id DESC",
      [userId]
    );

    // ✅ Attach items
    for (let order of orders) {
      const [items] = await db.query(
        `SELECT oi.quantity, m.item_name AS name
         FROM order_items oi
         LEFT JOIN menu_items m 
         ON oi.menu_item_id = m.item_id
         WHERE oi.order_id = ?`,
        [order.order_id]
      );

      order.items = items;
    }

    res.json({
      success: true,
      data: orders
    });

  } catch (err) {
    console.error("GET ORDERS ERROR:", err);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};