const db = require("../config/db");

/* ================= GET STATS ================= */
exports.getStats = async (req, res) => {
  try {
    const { canteen_id } = req.params;

    const [[orders]] = await db.query(
      "SELECT COUNT(*) as total FROM orders WHERE canteen_id=?",
      [canteen_id]
    );

    const [[revenue]] = await db.query(
      "SELECT SUM(total_amount) as revenue FROM orders WHERE canteen_id=?",
      [canteen_id]
    );

    const [[items]] = await db.query(
      "SELECT COUNT(*) as total FROM menu_items WHERE canteen_id=?",
      [canteen_id]
    );

    res.json({
      orders: orders.total,
      revenue: revenue.revenue || 0,
      items: items.total
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

/* ================= GET RECENT ORDERS ================= */
exports.getRecentOrders = async (req, res) => {
  try {
    const { canteen_id } = req.params;

    const [orders] = await db.query(`
      SELECT * FROM orders
      WHERE canteen_id=?
      ORDER BY created_at DESC
      LIMIT 10
    `, [canteen_id]);

    res.json(orders);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

/* ================= UPDATE ORDER STATUS ================= */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.query(
      "UPDATE orders SET status=? WHERE order_id=?",
      [status, id]
    );

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};