const express = require("express");
const router = express.Router();

const { 
  getRestaurants,
  getRestaurantsByLocation   // ✅ add this
} = require("../controllers/restaurantController");

router.get("/", getRestaurants);

// ✅ NEW ROUTE
router.get("/:location", getRestaurantsByLocation);

module.exports = router;