import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useLocation } from "react-router-dom";

function FloatingCart() {

  const { cartCount, mode, cart } = useContext(AppContext);

  const location = useLocation();

  const [animate, setAnimate] = useState(false);

  // ✅ SAFE COUNT (no crash if cart undefined)
  const count = cartCount;
  console.log("🛒 FLOAT DEBUG:", { cartCount, cart });

  // 🔥 ANIMATION
    useEffect(() => {
    if (!count) return;

    const start = setTimeout(() => {
        setAnimate(true);

        const end = setTimeout(() => {
        setAnimate(false);
        }, 300);

        return () => clearTimeout(end);
    }, 0); // 👈 key fix (async)

    return () => clearTimeout(start);
    }, [count]);

  // 🚫 HIDE IN VENDOR MODE
  if (mode !== "customer") return null;

  // 🚫 HIDE ON SPECIFIC ROUTES (better check)
  const hideRoutes = [
    "/vendor-login",
    "/vendor-register",
    "/vendor-dashboard"
  ];

  if (hideRoutes.some(route => location.pathname.startsWith(route))) {
    return null;
  }

  // 🚫 HIDE IF EMPTY
  if (!count || count < 0) return null;

  return (
    <Link
      to="/cart"
      className={`fixed bottom-6 right-6 z-50 bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center text-xl shadow-xl transition ${
        animate
          ? "scale-125 transition-transform duration-300"
          : "hover:scale-110"
      }`}
    >
      🛒

      <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full font-bold">
        {count}
      </span>
    </Link>
  );
}

export default FloatingCart;