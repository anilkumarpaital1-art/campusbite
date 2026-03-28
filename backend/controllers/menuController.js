const db = require("../config/db");

console.log("🚀 MENU API LOADED");

/* ================= GET MENU ================= */

const getMenu = async (req, res) => {
  try {
    console.log("=================================");
    console.log("🔥 CONTROLLER HIT");

    // ✅ GET PARAM
    const { restaurantId } = req.params;

    console.log("👉 RAW restaurantId:", restaurantId);

    if (!restaurantId) {
      return res.status(400).json({
        success: false,
        message: "restaurantId is required"
      });
    }

    // 🔥 FIX: convert to number
    const id = Number(restaurantId);

    console.log("👉 CONVERTED ID:", id);

    // ❗ safety check
    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid restaurantId"
      });
    }

    // ✅ MAIN QUERY
    const [rows] = await db.query(
      "SELECT * FROM menu_items WHERE canteen_id = ?",
      [id]
    );

    console.log("👉 ROWS FOUND:", rows.length);

    res.json({
      success: true,
      data: rows
    });

  } catch (err) {
    console.error("🔥 ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

/* ================= ADD ITEM ================= */

const addMenuItem = async (req, res) => {
  try {
    const { canteen_id, category_id, item_name, price, image } = req.body;

    if (!canteen_id || !category_id || !item_name || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const [result] = await db.query(
      `INSERT INTO menu_items 
       (canteen_id, category_id, item_name, price, image, available) 
       VALUES (?, ?, ?, ?, ?, 1)`,
      [canteen_id, category_id, item_name, price, image || null]
    );

    res.json({
      success: true,
      message: "Item added successfully ✅",
      item_id: result.insertId
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

const toggleAvailability = async (req, res) => {
  try {
    const { item_id, available } = req.body;

    if (!item_id) {
      return res.status(400).json({
        success: false,
        message: "item_id is required"
      });
    }

    await db.query(
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

/* ================= EXPORT ================= */

module.exports = {
  getMenu,
  addMenuItem,
  toggleAvailability
};