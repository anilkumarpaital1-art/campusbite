import { createContext, useState, useEffect, useCallback } from "react";
import { getCart } from "../services/api";
import { useMemo } from "react";
import { getOrders } from "../services/api";


const AppContext = createContext();



export const AppProvider = ({ children }) => {


  // ================= USER =================
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  // ================= MODE =================
  const [mode, setMode] = useState(
    () => localStorage.getItem("mode") || "customer"
  );

  const switchToVendor = () => {
    setMode("vendor");
    localStorage.setItem("mode", "vendor");
  };

  const switchToCustomer = () => {
    setMode("customer");
    localStorage.setItem("mode", "customer");
  };

  // ================= VENDOR =================
  const [vendorRestaurant, setVendorRestaurant] = useState(
    () => localStorage.getItem("vendorRestaurant") || null
  );

  // ================= STATES =================
  const [cart, setCart] = useState({});
  const [activeCanteen, setActiveCanteen] = useState(null);

  const [loading, setLoading] = useState(false);

  const [orders, setOrders] = useState([]);

  const [showSwitchModal, setShowSwitchModal] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);


  const [favorites, setFavorites] = useState(() => {
  try {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
});


  const userId = user?.user_id;


  // ================= CART SYNC =================
const refreshCart = useCallback(async () => {
  try {
    if (!userId) {
      setCart({});
      return {};
    }

    const res = await getCart(userId);
    console.log("🚀 GET CART RESPONSE:", res);

    if (res.success) {
  const grouped = {};

  res.data.forEach(item => {
    const canteen = item.canteen_id;

    if (!grouped[canteen]) {
      grouped[canteen] = [];
    }

    grouped[canteen].push({
      id: item.item_id,
      item_name: item.item_name,
      price: item.price,
      quantity: item.quantity,
      restaurantName: item.restaurant_name
    });
  });

  // 🔥 REMOVE EMPTY CANTEENS
  const cleaned = Object.fromEntries(
    Object.entries(grouped).filter(([, items]) => items.length > 0)
  );

  // 🔥 UPDATE CART
  setCart({ ...cleaned });

  // 🔥 AUTO SWITCH ACTIVE CANTEEN
  setActiveCanteen(prev => {
    if (cleaned[prev]) return prev;

    const next = Object.keys(cleaned)[0];
    return next ? Number(next) : null;
  });

  console.log("🧠 CONTEXT CART:", cleaned);

  return cleaned;
}

    return {};

  } catch (err) {
    console.error("❌ Cart sync error:", err);
    setCart({});
    return {};
  }
}, [userId]);


useEffect(() => {
  if (!userId) return;

  const loadAll = async () => {
    setLoading(true);

    try {
      const [cartRes, ordersRes] = await Promise.all([
        getCart(userId),
        getOrders(userId)
      ]);

      // 🛒 CART
      if (cartRes.success) {
        const grouped = {};

        cartRes.data.forEach(item => {
          const canteen = item.canteen_id;

          if (!grouped[canteen]) grouped[canteen] = [];

          grouped[canteen].push({
            id: item.item_id,
            item_name: item.item_name,
            price: item.price,
            quantity: item.quantity,
            restaurantName: item.restaurant_name
          });
        });

        setCart(grouped);
      }

      // 📦 ORDERS
      setOrders(Array.isArray(ordersRes?.data) ? ordersRes.data : []);

    } catch (err) {
      console.error("Load error:", err);
      setCart({});
      setOrders([]);
    }

    setTimeout(() => {
      setLoading(false);   // 🔥 smooth UX
    }, 300);

  };

  loadAll();

}, [userId]);




  // 🔥 FIX: AUTO SET ACTIVE CANTEEN AFTER REFRESH
  // ✅ SAFE DERIVED VALUE (NO ESLINT ERROR)
const effectiveCanteen =
  activeCanteen ?? (Object.keys(cart)[0] ? Number(Object.keys(cart)[0]) : null);
  

  // ================= FILTER =================
const filteredCart = useMemo(() => {
  if (!effectiveCanteen) return [];
  return cart[effectiveCanteen] || [];
}, [cart, effectiveCanteen]);



  // ================= CART ACTIONS =================
const removeFromCart = async (id) => {
  await fetch("https://campusbite-ur6n.onrender.com/api/cart/remove", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      menu_item_id: id
    })
  });

  await refreshCart();
};


const increaseQty = async (id) => {
  const item = Object.values(cart)
  .flat()
  .find(i => i.id === id);
  if (!item) return;

  await fetch("https://campusbite-ur6n.onrender.com/api/cart/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      menu_item_id: id,
      quantity: item.quantity + 1
    })
  });

  await refreshCart();
};


const decreaseQty = async (id) => {
  const item = filteredCart.find(i => i.id === id);
  if (!item) return;

  const newQty = item.quantity - 1;

  if (newQty <= 0) {
    await removeFromCart(id);
    return;
  }

  await fetch("https://campusbite-ur6n.onrender.com/api/cart/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      menu_item_id: id,
      quantity: newQty
    })
  });

  await refreshCart();
};

  // ================= CLEAR =================
  const clearCartLocal = (canteenId) => {
  setCart(prev => {
    const updated = { ...prev };
    delete updated[canteenId];

    const remainingKeys = Object.keys(updated);
    setActiveCanteen(
      remainingKeys.length ? Number(remainingKeys[0]) : null
    );

    return updated;
  });
};

  // ================= ADD TO CART =================
const addToCartHandler = async (item) => {
  try {
    if (!userId) return;

    // 🚨 CHECK DIFFERENT CANTEEN
    const currentCanteen = effectiveCanteen;

const isDifferent =
  currentCanteen !== null &&
  Number(currentCanteen) !== Number(item.restaurantId);

  

    // 👉 ALWAYS ADD ITEM FIRST
   // 🚨 FIRST CHECK → DO NOT ADD YET
if (isDifferent) {
  console.log("⚠️ Different canteen → show modal");

  setPendingItem(item);
  setShowSwitchModal(true);

  return; // 🔥 VERY IMPORTANT (STOP HERE)
}

// ✅ NORMAL ADD
await fetch("https://campusbite-ur6n.onrender.com/api/cart/add", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    user_id: userId,
    menu_item_id: item.id,
    quantity: 1
  })
});

setActiveCanteen(item.restaurantId);
await refreshCart();

  } catch (err) {
    console.error("AddToCart Error:", err);
  }
};

  // ================= SWITCH =================
const handleConfirmSwitch = async () => {
  if (!pendingItem) return;

  // ✅ NOW ADD ITEM (AFTER CONFIRM)
  await fetch("https://campusbite-ur6n.onrender.com/api/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      menu_item_id: pendingItem.id,
      quantity: 1
    })
  });

  // ✅ SWITCH ACTIVE VIEW
  setActiveCanteen(pendingItem.restaurantId);

  setPendingItem(null);
  setShowSwitchModal(false);

  await refreshCart();
};



  const handleCancelSwitch = () => {
    setShowSwitchModal(false);
    setPendingItem(null);
  };

  // ================= FAVORITES =================
  const toggleFavorite = (item) => {
    setFavorites(prev => {
  const exists = prev.find(f => f.id === item.id);

  const updated = exists
    ? prev.filter(f => f.id !== item.id)
    : [...prev, item];

  localStorage.setItem("favorites", JSON.stringify(updated)); // ✅ ADD

  return updated;
});
  };

  // ================= ORDER =================
  const placeOrder = () => {
    if (filteredCart.length === 0) return;

    const newOrder = {
      id: crypto.randomUUID(),
      items: filteredCart,
      total: filteredCart.reduce(
        (sum, i) => sum + i.price * i.quantity, 0
      ),
      status: "Placed",
      date: new Date().toLocaleString()
    };

    setOrders(prev => [newOrder, ...prev]);
  };

  // ================= LOGOUT =================
  const logout = () => {
  setUser(null);
  setMode("customer");
  setVendorRestaurant(null);

  localStorage.clear();

  setCart({});
  setOrders([]);
  setFavorites([]);

  setActiveCanteen(null);
};

  // ================= COUNT =================
  

const cartCount = useMemo(() => {
  return Object.values(cart).flat().reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );
}, [cart]);

  return (
<AppContext.Provider value={{
  user,
  setUser,
  mode,
  switchToVendor,
  switchToCustomer,
  vendorRestaurant,
  setVendorRestaurant,
  cart,
  filteredCart,
  activeCanteen,
  effectiveCanteen,
  setActiveCanteen,
  cartCount,
  refreshCart,
  orders,
  favorites,
  addToCart: addToCartHandler,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCartLocal,
  toggleFavorite,
  placeOrder,
  logout,
  showSwitchModal,
  setShowSwitchModal,
  handleConfirmSwitch,
  handleCancelSwitch,
  pendingItem,

  loading   // ✅ ADD THIS LINE
}}>

      {children}


    </AppContext.Provider>
  );
};

export { AppContext };