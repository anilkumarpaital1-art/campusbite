const { queryDebug } = require("../config/db")

/* ================= ADD ITEM ================= */

exports.addItem = async (req, res) => {
  try {
    const { canteen_id, item_name, price } = req.body;

    if (!canteen_id || !item_name || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    await queryDebug(
      "INSERT INTO menu_items (canteen_id, item_name, price, available) VALUES (?, ?, ?, 1)",
      [canteen_id, item_name, price]
    );

    res.json({
      success: true,
      message: "Item added successfully ✅"
    });

  } catch (err) {
    console.error("🔥 ADD ITEM ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* ================= TOGGLE ================= */

exports.toggleAvailability = async (req, res) => {
  try {
    const { item_id, available } = req.body;

    if (!item_id) {
      return res.status(400).json({
        success: false,
        message: "item_id is required"
      });
    }

    await query(
      "UPDATE menu_items SET available=? WHERE item_id=?",
      [available, item_id]
    );

    res.json({
      success: true,
      message: "Availability updated"
    });

  } catch (err) {
    console.error("🔥 TOGGLE ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};