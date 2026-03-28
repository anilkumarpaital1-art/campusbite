const db = require("../config/db");

/* ================= GET ALL RESTAURANTS ================= */

exports.getRestaurants = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM canteens");

    const fixNames = {
      "aste_of_italy.jpg": "taste_of_italy.jpg",
      "urger_singh.jpg": "burger_singh.jpg",
      "escafe_gate_2.jpg": "nescafe_gate_2.jpg",
      "he_food_scientists.jpg": "the_food_scientists.jpg",
      "mc.jpg": "csb.jpg",
      "hc.jpg": "h&c.jpg",
      "ibet_kitchen.jpg": "tibet_kitchen.jpg",
      "unkers.jpg": "bunkers.jpg",
    };

    const updatedRows = rows.map(row => {
      let fileName = null;

      if (row.banner_image) {
        let cleanPath = row.banner_image
          .replace(/\\/g, "/")
          .replace(/[\t\n\r]/g, "");

        if (cleanPath.includes("/")) {
          fileName = cleanPath.substring(cleanPath.lastIndexOf("/") + 1);
        } else {
          fileName = cleanPath.replace("backendimagescanteens", "");
        }

        fileName = fileName
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^\w.-]/g, "");
      }

      const finalName = fixNames[fileName] || fileName;

      return {
        ...row,
        banner_image: finalName
          ? `/images/canteens/${encodeURIComponent(finalName)}`
          : null
      };
    });

    res.json({
      success: true,
      data: updatedRows
    });

  } catch (error) {
    console.error("🔥 DB ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};


/* ================= GET RESTAURANTS BY LOCATION ================= */

exports.getRestaurantsByLocation = async (req, res) => {
  try {

    const { location } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM canteens WHERE location = ?",
      [location]
    );

    const fixNames = {
      "aste_of_italy.jpg": "taste_of_italy.jpg",
      "urger_singh.jpg": "burger_singh.jpg",
      "escafe_gate_2.jpg": "nescafe_gate_2.jpg",
      "he_food_scientists.jpg": "the_food_scientists.jpg",
      "mc.jpg": "csb.jpg",
      "hc.jpg": "h&c.jpg",
      "ibet_kitchen.jpg": "tibet_kitchen.jpg",
      "unkers.jpg": "bunkers.jpg",
    };

    const updatedRows = rows.map(row => {
      let fileName = null;

      if (row.banner_image) {
        let cleanPath = row.banner_image
          .replace(/\\/g, "/")
          .replace(/[\t\n\r]/g, "");

        if (cleanPath.includes("/")) {
          fileName = cleanPath.substring(cleanPath.lastIndexOf("/") + 1);
        } else {
          fileName = cleanPath.replace("backendimagescanteens", "");
        }

        fileName = fileName
          .toLowerCase()
          .replace(/\s+/g, "_")
          .replace(/[^\w.-]/g, "");
      }

      const finalName = fixNames[fileName] || fileName;

      return {
        ...row,
        banner_image: finalName
          ? `/images/canteens/${encodeURIComponent(finalName)}`
          : null
      };
    });

    res.json({
      success: true,
      data: updatedRows
    });

  } catch (error) {
    console.error("🔥 DB ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};