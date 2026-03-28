const db = require("../config/db");

/* ================= ADD TO CART ================= */

exports.addToCart = async (req, res) => {
  try {
    const { user_id, menu_item_id, quantity = 1 } = req.body;

    if (!user_id || !menu_item_id) {
      return res.status(400).json({
        success: false,
        message: "user_id and menu_item_id are required"
      });
    }

    console.log("📥 AddToCart:", user_id, menu_item_id);

    // ✅ ONLY ONE QUERY (REMOVE DUPLICATE)
    const [existingItem] = await db.query(
      "SELECT * FROM cart WHERE user_id = ? AND menu_item_id = ?",
      [user_id, menu_item_id]
    );

    if (existingItem.length > 0) {
      // 🔁 UPDATE
      await db.query(
        "UPDATE cart SET quantity = quantity + ? WHERE user_id = ? AND menu_item_id = ?",
        [quantity, user_id, menu_item_id]
      );
    } else {
      // ➕ INSERT
      await db.query(
        "INSERT INTO cart (user_id, menu_item_id, quantity) VALUES (?, ?, ?)",
        [user_id, menu_item_id, quantity]
      );
    }

    res.json({
      success: true,
      message: "Added to cart"
    });

  } catch (err) {
    console.error("🔥 AddToCart Error:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


/* ================= GET CART ================= */

exports.getCart = async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("🛒 Fetch cart for:", userId);

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required"
      });
    }

    const [rows] = await db.query(`
      SELECT 
        c.id AS cart_id,
        c.menu_item_id AS item_id,   -- ✅ FIX
        c.quantity,
        m.item_name,
        m.price,
        m.image,
        m.canteen_id,
        ct.name AS restaurant_name
      FROM cart c
      LEFT JOIN menu_items m 
        ON c.menu_item_id = m.item_id
      LEFT JOIN canteens ct 
        ON m.canteen_id = ct.canteen_id
      WHERE c.user_id = ?
    `, [userId]);

    res.json({
      success: true,
      data: rows
    });

  } catch (err) {
    console.error("🔥 GetCart Error:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


/* ================= UPDATE CART ================= */

exports.updateCart = async (req, res) => {
  try {
    const { user_id, menu_item_id, quantity } = req.body;

    if (!user_id || !menu_item_id || quantity == null) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    // ❗ If quantity = 0 → delete item
    if (quantity === 0) {
      await db.query(
        "DELETE FROM cart WHERE user_id = ? AND menu_item_id = ?",
        [user_id, menu_item_id]
      );

      return res.json({
        success: true,
        message: "Item removed"
      });
    }

    await db.query(
      "UPDATE cart SET quantity = ? WHERE user_id = ? AND menu_item_id = ?",
      [quantity, user_id, menu_item_id]
    );

    res.json({
      success: true,
      message: "Cart updated"
    });

  } catch (err) {
    console.error("🔥 UpdateCart Error:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


/* ================= REMOVE FROM CART ================= */

exports.removeFromCart = async (req, res) => {
  try {
    const { user_id, menu_item_id } = req.body;

    if (!user_id || !menu_item_id) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    await db.query(
      "DELETE FROM cart WHERE user_id = ? AND menu_item_id = ?",
      [user_id, menu_item_id]
    );

    res.json({
      success: true,
      message: "Item removed"
    });

  } catch (err) {
    console.error("🔥 RemoveCart Error:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};