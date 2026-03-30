import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "../components/CartItem";
import { getMenu } from "../services/api";
import { AppContext } from "../context/AppContext";



const couponRules = {
  BITE50: { min: 500, type: "flat", value: 50 },
  STUDENT10: { min: 300, type: "percent", value: 10 },
  FREESHIP: { min: 200, type: "flat", value: 30 },
  SUPER20: { min: 600, type: "percent", value: 20 }
};

export default function CartPage() {
  
  const navigate = useNavigate();
  const {
  cart,
  effectiveCanteen,   // ✅ ADD THIS LINE
  setActiveCanteen,
  increaseQty,
  decreaseQty,
  addToCart
} = useContext(AppContext);


  const [menuItems, setMenuItems] = useState([]);
  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    const saved = localStorage.getItem("coupons");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("coupons", JSON.stringify(appliedCoupon));
  }, [appliedCoupon]);
  
  const [showMsg, setShowMsg] = useState("");

  /* FETCH */


  /* AUTO SELECT */

  /* GROUP */
  const groupedCarts = Object.entries(cart)
  .filter(([, items]) => items.length > 0) // 🔥 remove empty
  .map(([id, items]) => ({
    id,
    name: items[0]?.restaurantName || `Restaurant ${id}`,
    count: items.reduce((sum, i) => sum + i.quantity, 0)
  }));

  const currentItems = effectiveCanteen
  ? cart[effectiveCanteen] || []
  : [];

  /* MENU */
  useEffect(() => {
      if (!effectiveCanteen) return;
      getMenu(effectiveCanteen).then((data) =>
      setMenuItems(Array.isArray(data) ? data : [])
    );
  }, [effectiveCanteen]);

  /* ACTIONS */


  /* TOTAL */
  const subtotal = currentItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const unlockMessages = Object.entries(couponRules).map(([code, rule]) => {
  if (subtotal < rule.min) {
    return {
      code,
      remaining: rule.min - subtotal
    };
  }
  return null;
}).filter(Boolean);

  const currentCoupon = appliedCoupon[effectiveCanteen] || null;
  const rule = currentCoupon ? couponRules[currentCoupon] : null;

  const discount = rule
    ? rule.type === "flat"
      ? rule.value
      : Math.floor((subtotal * rule.value) / 100)
    : 0;

  const total = subtotal - discount;

  /* APPLY */
    const handleApply = (code) => {
    const rule = couponRules[code];

    if (!rule || subtotal < rule.min) {
      setShowMsg("Not eligible ❌");
      setTimeout(() => setShowMsg(""), 1500);
      return;
    }

    setAppliedCoupon((prev) => ({
      ...prev,
      [effectiveCanteen]: code
    }));

    setShowMsg("Coupon applied 🎉");

    setTimeout(() => {
      setShowMsg("");
    }, 1500); // ⏱️ 1.5 sec like Swiggy
  };

  /* REMOVE */
  const handleRemove = () => {
    setAppliedCoupon((prev) => {
      const updated = { ...prev };
      delete updated[effectiveCanteen];
      return updated;
    });

    setShowMsg("Coupon removed");
    setTimeout(() => setShowMsg(""), 2000);
  };

  /* SUGGESTIONS */
  const filteredSuggestions = menuItems
    .filter(
      (item) =>
        !currentItems.some((c) => c.id === item.item_id)
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 sm:px-6 md:px-12 py-6 sm:py-8 relative">

        {showMsg && (
          <div className="fixed bottom-5 left-5 
                          bg-black text-white 
                          px-4 py-2 
                          rounded-full text-sm 
                          shadow-lg z-50 
                          animate-fade-in">
            {showMsg}
          </div>
        )}

      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Your Cart</h2>

      {/* TABS */}
      <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto">
        {groupedCarts.map((c) => (
          <div
            key={c.id}
            onClick={() => setActiveCanteen(Number(c.id))}
            className={`min-w-[130px] px-3 py-2 rounded-xl text-sm cursor-pointer border ${
              Number(effectiveCanteen) === Number(c.id)
                ? "bg-red-600 text-white"
                : "bg-white"
            }`}
          >
            <p className="font-semibold text-sm">{c.name}</p>
            <p className="text-xs opacity-80">{c.count} items</p>
          </div>
        ))} </div>

        

      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6 md:gap-10">

        {/* LEFT */}
        <div className="bg-white px-2 sm:px-3 py-2 rounded-lg mb-2 shadow-sm hover:shadow-md transition">

          {/* SHOW ONLY SELECTED CART */}
          {effectiveCanteen && cart[effectiveCanteen]?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 text-lg">
                {cart[effectiveCanteen][0]?.restaurantName}
              </h3>

              {cart[effectiveCanteen].map((item) => (
                <div key={item.id} className="bg-white px-3 py-2 rounded-lg mb-2 shadow-sm hover:shadow-md transition">
                  <CartItem
                    item={{
                      id: item.id,
                      name: item.name || item.item_name,
                      price: item.price,
                      quantity: item.quantity
                    }}
                    increase={() => increaseQty(item.id)}
                    decrease={() => decreaseQty(item.id)}
                  />
                </div>
              ))}
            </div>
          )}


          {unlockMessages.length > 0 && (
            <div className="mb-4 p-3 rounded-xl border border-orange-300 bg-orange-50 text-sm">
              Add ₹{unlockMessages[0].remaining} more to unlock{" "}
              <span className="font-semibold">
                {unlockMessages[0].code}
              </span>
            </div>
          )}


          {/* COUPONS */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold mb-4">Offers & Coupons</h3>

            {Object.keys(couponRules).map((code) => {
              const isApplied = currentCoupon === code;
              const rule = couponRules?.[code];

              return (
                <div
                  key={code}
                  className={`flex justify-between items-center mb-3 p-4 rounded-xl border ${
                    isApplied ? "bg-green-100 border-green-400" : ""
                  }`}
                >
                  <div>
                    <p className="font-semibold text-lg tracking-wide">
                      {code} {isApplied && "✔"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {rule.type === "flat"
                        ? `₹${rule.value} off on orders above ₹${rule.min}`
                        : `${rule.value}% off on orders above ₹${rule.min}`}
                    </p>
                  </div>

                  {isApplied ? (
                    <button
                      onClick={handleRemove}
                      className="bg-black text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => handleApply(code)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm transition"
                    >
                      Apply
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-3 sm:space-y-4">

          {filteredSuggestions.length > 0 && (
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-semibold mb-4">You may also like</h3>

              {filteredSuggestions.map((item) => (
                <div key={item.item_id} className="flex justify-between items-center mb-2 text-sm">
                  <span>{item.item_name}</span>
                  <button
                    onClick={async () => {
                     addToCart({
                      id: item.item_id,
                      restaurantId: effectiveCanteen
                    });
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded-full text-sm"
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-semibold mb-4">Bill Summary</h3>

            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between items-center text-green-600 text-sm">
              <span>Discount</span>
              <div className="flex items-center gap-2">
                <span>-₹{discount}</span>

                {discount > 0 && (
                  <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                    You saved ₹{discount}
                  </span>
                )}
              </div>
            </div>

            <hr className="my-2" />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button
            disabled={!effectiveCanteen}
            onClick={() => {
              if (!effectiveCanteen) {
                alert("Please select a canteen first");
                return;
              }
              navigate(`/checkout/${effectiveCanteen}`);
            }}
            className={`w-full mt-4 py-2.5 rounded-lg text-white text-sm sm:text-base font-semibold transition 
              ${!effectiveCanteen ? "bg-gray-400" : "bg-red-600 hover:bg-red-700"}`}
          >
            Checkout
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}