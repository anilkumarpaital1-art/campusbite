import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {

  const { user } = useContext(AppContext);

  const navigate = useNavigate();

  const { filteredCart, placeOrder, refreshCart } = useContext(AppContext);
  
  const { id } = useParams();
  console.log("Checkout Canteen ID:", id);

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: ""
  });

  const subtotal = filteredCart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = Math.floor(subtotal * 0.05);
  const platformFee = subtotal > 0 ? 10 : 0;
  const total = subtotal + tax + platformFee;

const handlePayment = () => {
  if (subtotal === 0) return;

  if (paymentMethod === "upi" && !upiId) {
    alert("Enter UPI ID");
    return;
  }

  if (paymentMethod === "card" && (!card.number || !card.name || !card.expiry || !card.cvv)) {
    alert("Fill all card details");
    return;
  }

  setLoading(true);

  setTimeout(async () => {
    try {
      // ✅ 1. CREATE ORDER FIRST
      const res = await fetch("http://localhost:5000/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user_id: user.user_id, // ✅ FIXED
          items: filteredCart.map(item => ({
            item_id: item.menu_item_id || item.id,
            quantity: item.quantity
          })),
          total_price: total
        })
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Order failed:", data);
        alert("Order failed");
        return;
      }

      console.log("ORDER SUCCESS:", data);

      // ✅ 2. THEN CLEAR CART
      await fetch(`http://localhost:5000/api/cart/clear/${id}?user_id=${user.user_id}`, {
        method: "DELETE"
      });

      // ✅ 3. UPDATE UI
      placeOrder();
      await refreshCart();

      setShowSuccess(true);

      setTimeout(() => {
        navigate("/orders", { replace: true });
      }, 2000);

    } catch (err) {
      console.error("Payment error:", err);
    }

    setLoading(false);
  }, 1200);
};

      console.log("CHECKOUT CART:", filteredCart);


if (showSuccess) {
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">

      <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl px-10 py-12 text-center max-w-sm w-full animate-fadeIn">

        {/* ICON */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            
            {/* Glow circle */}
            <div className="absolute inset-0 bg-green-400 opacity-20 blur-2xl rounded-full animate-pulse"></div>

            {/* Checkmark */}
            <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-green-500 text-white text-4xl shadow-lg animate-scaleIn">
              ✓
            </div>

          </div>
        </div>

        {/* TEXT */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed!
        </h2>

        <p className="text-gray-500 text-sm mb-6">
          Your delicious food is on the way 🚀
        </p>

        {/* LOADING BAR */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 animate-loadingBar"></div>
        </div>

        <p className="text-xs text-gray-400 mt-3">
          Redirecting to orders...
        </p>

      </div>

    </div>
  );
}

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 px-6 md:px-12 py-10">

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Checkout</h1>

      <div className="grid md:grid-cols-[1.6fr_1fr] gap-10">

        {/* LEFT */}
        <div className="space-y-6">

          {/* ORDER LIST (COMPACT) */}
          <div className="bg-white p-5 rounded-3xl shadow-lg">
            <h2 className="font-semibold mb-4">Your Order</h2>

            {filteredCart.length === 0 ? (
              <p className="text-gray-500 text-sm">Cart is empty</p>
            ) : (
              <div className="space-y-2">
                {filteredCart.map(item => (
                  <div
                    key={`${item.menu_item_id || item.id}-${item.quantity}`}
                    className="flex justify-between text-sm bg-gray-50 px-3 py-2 rounded-lg"
                  >
                    <span>{item.item_name} × {item.quantity}</span>
                    <span className="font-medium">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* PAYMENT METHODS */}
          <div className="bg-white p-6 rounded-3xl shadow-lg">
            <h2 className="font-semibold mb-4">Payment Method</h2>

            <div className="space-y-3">

              {[
                { id: "upi", label: "UPI", icon: "📱" },
                { id: "card", label: "Card", icon: "💳" },
                { id: "razorpay", label: "Razorpay", icon: "⚡" },
                { id: "cod", label: "Cash on Delivery", icon: "💵" }
              ].map(method => (
                <div
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`p-3 rounded-xl border cursor-pointer flex justify-between
                  ${paymentMethod === method.id
                    ? "border-red-500 bg-red-50"
                    : "hover:bg-gray-50"
                  }`}
                >
                  <span>{method.icon} {method.label}</span>
                  <div className={`w-4 h-4 rounded-full border-2 
                    ${paymentMethod === method.id ? "bg-red-500 border-red-500" : ""}`}
                  />
                </div>
              ))}

            </div>

            {/* UPI INPUT */}
            {paymentMethod === "upi" && (
              <input
                placeholder="Enter UPI ID"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="mt-4 w-full border px-3 py-2 rounded-xl"
              />
            )}

            {/* CARD FORM */}
            {paymentMethod === "card" && (
              <div className="space-y-3 mt-4">

                <input
                  placeholder="Card Number"
                  className="w-full border px-3 py-2 rounded-xl"
                  onChange={(e) => setCard({ ...card, number: e.target.value })}
                />

                <input
                  placeholder="Card Holder Name"
                  className="w-full border px-3 py-2 rounded-xl"
                  onChange={(e) => setCard({ ...card, name: e.target.value })}
                />

                <div className="flex gap-3">
                  <input
                    placeholder="MM/YY"
                    className="w-full border px-3 py-2 rounded-xl"
                    onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                  />
                  <input
                    placeholder="CVV"
                    className="w-full border px-3 py-2 rounded-xl"
                    onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                  />
                </div>

              </div>
            )}

            {/* RAZORPAY INFO */}
            {paymentMethod === "razorpay" && (
              <p className="mt-4 text-sm text-gray-500">
                You will be redirected to Razorpay gateway
              </p>
            )}

          </div>

        </div>

        {/* RIGHT - BILL */}
        <div className="bg-white p-6 rounded-3xl shadow-lg sticky top-24 h-fit">

          <h2 className="font-semibold mb-5">Bill Summary</h2>

          <div className="space-y-2 text-sm">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            {subtotal > 0 && (
              <>
                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹{tax}</span>
                </div>
              </>
            )}

            <div className="border-t my-3"></div>

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

          </div>

          <button
            onClick={handlePayment}
            disabled={loading || subtotal === 0}
            className={`w-full mt-6 py-3 rounded-xl text-white font-semibold
            ${subtotal === 0 ? "bg-gray-300" : "bg-red-600 hover:bg-red-700"}`}
          >
            {loading ? "Processing..." : `Pay ₹${total}`}
          </button>

        </div>

      </div>

    </div>
  );
}