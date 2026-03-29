import axios from "axios";

const API = "https://campusbite-ur6n.onrender.com/api/menu";

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