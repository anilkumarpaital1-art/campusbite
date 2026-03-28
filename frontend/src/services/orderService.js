import api from "./api";

// ✅ Place order
export const placeOrder = async (data) => {
  try {
    const res = await api.post("/orders", data);
    return res.data;
  } catch (err) {
    console.error("Order Error:", err);
    return null;
  }
};

// ✅ Get user orders
export const getOrders = async (userId) => {
  try {
    const res = await api.get(`/orders/${userId}`);
    return res.data;
  } catch (err) {
    console.error("Get Orders Error:", err);
    return [];
  }
};