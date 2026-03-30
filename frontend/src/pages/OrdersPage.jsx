import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import OrderProgress from "../components/OrderProgress";
import { getOrders } from "../services/api";
import { AppContext } from "../context/AppContext";

export default function OrdersPage(){

const navigate = useNavigate();

const { user } = useContext(AppContext);   // ✅ FIX HERE

const [orders,setOrders] = useState([]);

/* ✅ FETCH FROM API */
useEffect(() => {
  if (!user?.user_id) return;

  const fetchOrders = async () => {
    const data = await getOrders(user.user_id);
    console.log("ORDERS RESPONSE:", data);

    setOrders(Array.isArray(data?.data) ? data.data : []);
  };

  fetchOrders();

  const interval = setInterval(fetchOrders, 5000);

  return () => clearInterval(interval);
}, [user]);

console.log("USER:", user);


// 🔥 SHOW ONLY LATEST 5 ORDERS
const visibleOrders = [...orders]
  .sort((a, b) => new Date(b.order_time) - new Date(a.order_time));


// TOTAL ORDERS
const totalOrders = visibleOrders.length;

// TOTAL SPENT
const totalSpent = visibleOrders.length
  ? visibleOrders.reduce(
      (sum, order) => sum + Number(order.total_price || 0),
      0
    )
  : 0;

// LAST ORDER DATE
const lastOrder = visibleOrders.length
  ? new Date(visibleOrders[0].order_time).toLocaleDateString()
  : "—";

return(

<div className="min-h-[80vh] bg-gray-100 px-4 sm:px-16 pt-[40px] sm:pt-[50px] pb-6 sm:pb-10">

{/* HEADER */}

<div className="mb-6 sm:mb-8 text-left">

<h1 className="text-xl sm:text-3xl font-semibold text-gray-800">
Your Orders
</h1>

<p className="text-gray-500 text-xs sm:text-sm mt-0.5">
Track your recent food orders and delivery status
</p>

</div>


{/* MAIN GRID */}

<div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6 sm:gap-8">


{visibleOrders.length === 0 && (
  <div className="text-center text-gray-500 py-10">
    No orders yet 🍽️
  </div>
)}


{/* LEFT ORDERS */}

<div className="space-y-3">

{visibleOrders.map(order => (

<div
key={order.order_id}
className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 px-4 sm:px-5 py-3 sm:py-4"
>

<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">

<div>

<h3 className="font-semibold text-gray-800 text-xs sm:text-sm">
Order #{order.order_id}
</h3>

</div>

<div className="text-right">

<p className="text-red-500 font-bold text-sm sm:text-base">
₹{order.total_price}
</p>

<p className="text-xs text-gray-400">
  {order.order_time
    ? new Date(order.order_time).toLocaleDateString()
    : "—"}
</p>

<span className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-full font-medium">
Delivered
</span>

</div>

</div>


{/* ITEMS */}

<div className="flex justify-between items-center mt-2 text-sm">

<div className="text-gray-500 text-[11px] sm:text-sm">

{Array.isArray(order.items) && order.items.map((item, i) => (
  <span key={item.id || item.item_name || i}>
    {item.item_name || item.name} × {item.quantity}
    {i !== order.items.length - 1 && ", "}
  </span>
))}

</div>

</div>


{/* PROGRESS */}

<OrderProgress status={order.status} />

</div>

))}

</div>


{/* RIGHT SIDEBAR */}

<div className="space-y-4 mt-4 lg:mt-0">


{/* SUMMARY */}

<div className="bg-white rounded-2xl border border-gray-100 shadow-md p-4 sm:p-5">

<h3 className="font-semibold text-gray-800 mb-3">
Order Summary
</h3>

<div className="space-y-2 text-sm">

<div className="flex justify-between">
<span className="text-gray-500">Total Orders</span>
<span className="font-semibold">{totalOrders}</span>
</div>

<div className="flex justify-between">
<span className="text-gray-500">Total Spent</span>
<span className="font-semibold">₹{totalSpent.toFixed(2)}</span>
</div>

<div className="flex justify-between">
<span className="text-gray-500">Last Order</span>
<span className="font-semibold">{lastOrder}</span>
</div>

</div>

</div>


{/* QUICK ACTION */}

<div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">

<h3 className="font-semibold text-gray-800 mb-1">
Quick Action
</h3>

<p className="text-xs text-gray-500 mb-3">
Order your favorite meals again instantly.
</p>

<button
  onClick={() => navigate("/select-location")}
  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl text-sm font-semibold hover:scale-[1.02] transition-all duration-200 shadow-md active:scale-95"
>
  Browse Restaurants
</button>

</div>

</div>

</div>

</div>

)

}