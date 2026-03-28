import axios from "axios";

const API = "http://localhost:5000/api/menu";

// ✅ Get menu (all or by restaurant)
export const getMenu = async (restaurantId) => {
  try {
    const url = restaurantId ? `${API}/${restaurantId}` : API;

    const res = await axios.get(url);

    return res.data.data;
  } catch (err) {
    console.error("Menu API Error:", err);
    return [];
  }
};