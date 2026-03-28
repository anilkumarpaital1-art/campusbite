const API_BASE = "http://localhost:5000/api";

/* =========================
   GENERIC REQUEST
========================= */
const apiRequest = async (endpoint, method = "GET", data = null) => {
  try {
    console.log("🔥 API CALL:", endpoint, data);

    const options = {
      method,
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const res = await fetch(`${API_BASE}${endpoint}`, options);

    console.log("🔥 STATUS:", res.status);

    // 👇 SAFE JSON PARSE
    let result;
    try {
      result = await res.json();
    } catch (err) {
    console.error("❌ JSON parse error:", err);
      return { success: false, message: "Invalid server response" };
    }

    console.log("🔥 RESPONSE:", result);

    return result;

  } catch (error) {
    console.error("❌ API ERROR:", error);
    return { success: false, message: error.message };
  }
};
/* EXPORT THIS ALSO */
export { apiRequest };

/* =====================
   CUSTOMER AUTH
===================== */

export const loginUser = async (data) => {
  return apiRequest("/auth/login", "POST", data);
};

export const registerUser = async (data) => {
  return apiRequest("/auth/register", "POST", data);
};

export const forgotPassword = async (email) => {
  return apiRequest("/auth/forgot-password", "POST", { email });
};

/* =====================
   VENDOR AUTH
===================== */

export const vendorLogin = async (data) => {
  return apiRequest("/vendor/login", "POST", data);
};

export const vendorRegister = async (data) => {
  return apiRequest("/vendor/register", "POST", data);
};

export const resetPassword = async (data) => {
  const res = await fetch(`${API_BASE}/auth/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Failed to send reset link");
  }

  return res.json();
};

/* =====================
   CART APIs (UPDATED)
===================== */

export const getCart = async (userId) => {
  return await apiRequest(`/cart/${userId}`); // ✅ return FULL response
};

export const addToCart = async (data) => {
  return apiRequest("/cart/add", "POST", data);
};

export const updateCart = async (data) => {
  return apiRequest("/cart/update", "POST", data);
};

export const removeFromCart = async (data) => {
  return apiRequest("/cart/remove", "POST", data);
};

export const clearCart = async (userId) => {
  return fetch(`/api/cart/clear/${userId}`, {
    method: "DELETE",
  }).then(res => res.json());
};

/* =====================
   ORDER APIs
===================== */

export const placeOrder = async (data) => {
  return apiRequest("/orders", "POST", data);
};

export const getOrders = async (userId) => {
  return apiRequest(`/orders/${userId}`);
};

export const getOrderById = async (orderId) => {
  return apiRequest(`/orders/details/${orderId}`);
};

/* ============
   MENU API 
=============== */

export const getMenu = async (canteenId) => {
  const res = await apiRequest(`/menu/${canteenId}`);
  return res.data || [];
};