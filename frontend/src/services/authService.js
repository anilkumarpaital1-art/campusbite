import { apiRequest } from "./api";

// ✅ Register
export const registerUser = async (data) => {
  try {
    const res = await apiRequest("/auth/register", "POST", data);

    if (res?.success) {
      return res;
    } else {
      throw new Error(res?.message || "Registration failed");
    }

  } catch (err) {
    console.error("Register Error:", err);
    throw err; // 🔥 IMPORTANT (so UI can catch)
  }
};


// ✅ Login (FIXED PROPERLY)
export const loginUser = async (data) => {
  try {
    const res = await apiRequest("/auth/login", "POST", data);

    // ✅ FIX: detect success properly
    if (res?.user) {
      return res;
    } else {
      throw new Error(res?.message || "Login failed");
    }

  } catch (err) {
    console.error("Login Error:", err);
    throw err;
  }
};


// ✅ Get profile
export const getProfile = async () => {
  try {
    const res = await apiRequest("/auth/profile");

    if (res?.success) {
      return res;
    } else {
      throw new Error(res?.message || "Failed to fetch profile");
    }

  } catch (err) {
    console.error("Profile Error:", err);
    throw err;
  }
};