const { queryDebug } = require("../config/db")

/* GET ORDERS WITH ITEMS */
exports.getVendorOrders = async (req, res) => {
  const { canteen_id } = req.params;

  try {
    const [orders] = await queryDebug(
      `SELECT * FROM orders WHERE canteen_id=? ORDER BY created_at DESC`,
      [canteen_id]
    );

    for (let order of orders) {
      const [items] = await queryDebug(
        `SELECT oi.*, m.item_name 
         FROM order_items oi
         JOIN menu_items m ON oi.item_id = m.item_id
         WHERE oi.order_id=?`,
        [order.order_id]
      );

      order.items = items;
    }

    res.json(orders);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* UPDATE ORDER STATUS */
exports.updateVendorOrderStatus = async (req, res) => {
  const { order_id } = req.params;
  const { status } = req.body;

  try {
    await queryDebug(
      "UPDATE orders SET status=? WHERE order_id=?",
      [status, order_id]
    );

    res.json({ message: "Updated" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};