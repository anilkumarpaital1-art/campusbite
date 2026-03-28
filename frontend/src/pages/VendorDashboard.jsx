import { useContext, useState, useMemo, useEffect } from "react";
import { AppContext } from "../context/AppContext";

export default function VendorDashboard() {

  const { vendorRestaurant, orders, updateOrderStatus } = useContext(AppContext);

  const restaurantId = Number(vendorRestaurant) || 1;

  const restaurants = [
    { id: 1, name: "Campus Cafe" },
    { id: 2, name: "Food Court" }
  ];

  const restaurant = restaurants.find(r => r.id === restaurantId);

  const restaurantOrders = orders.filter(
    (o) => o.restaurantId === restaurantId
  );

  /* STATE */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sort, setSort] = useState("latest");
  const [isOpen, setIsOpen] = useState(true);

  const [currentTime, setCurrentTime] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  /* FILTER */
  const filteredOrders = useMemo(() => {
    let data = restaurantOrders.filter(order =>
      order.items.some(i =>
        i.name.toLowerCase().includes(search.toLowerCase())
      ) || order.id.toString().includes(search)
    );

    if (statusFilter !== "All") {
      data = data.filter(o => o.status === statusFilter);
    }

    return data.sort((a, b) =>
      sort === "latest" ? b.id - a.id : a.id - b.id
    );

  }, [restaurantOrders, search, statusFilter, sort]);

  /* STATS */
  const totalOrders = restaurantOrders.length;

  const revenue = restaurantOrders
    .filter(o => o.status === "Delivered")
    .reduce((sum, o) => sum + o.total, 0);

  const pendingOrders = restaurantOrders.filter(o => o.status === "Pending");

  function getTimeAgo(timestamp) {
    if (!timestamp) return "";
    const diff = Math.floor((currentTime - new Date(timestamp)) / 1000);
    const mins = Math.floor(diff / 60);
    return `${mins} min ago`;
  }

  return (
<div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex">

<div className="flex-1 p-6 space-y-6">

{/* HEADER */}
<div className="flex justify-between items-center">
  <div>
    <h1 className="text-3xl font-bold text-gray-800">
      {restaurant?.name}
    </h1>
    <p className="text-sm text-gray-500">
      Operations Dashboard
    </p>
  </div>

  <button
    onClick={() => setIsOpen(!isOpen)}
    className={`px-5 py-2 rounded-full text-sm font-medium shadow-lg
      ${isOpen
        ? "bg-green-500 text-white"
        : "bg-red-500 text-white"
      }`}
  >
    {isOpen ? "🟢 Live" : "🔴 Offline"}
  </button>
</div>

{/* BANNER */}
<div className="bg-white border rounded-xl p-4 flex justify-between items-center shadow-sm">
  <p className="text-sm font-medium text-gray-700">
    🚀 AI automation & insights coming soon
  </p>
  <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
    Coming Soon
  </span>
</div>

{/* STATS */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-5">
  <BigStat title="Orders" value={totalOrders}/>
  <BigStat title="Revenue" value={`₹${revenue}`}/>
  <BigStat title="Pending" value={pendingOrders.length}/>
  <BigStat title="Active" value={filteredOrders.length}/>
</div>

{/* MAIN GRID */}
<div className="grid lg:grid-cols-4 gap-6">

{/* LEFT */}
<div className="lg:col-span-3 space-y-6">

{/* CONTROLS */}
<div className="bg-white rounded-xl shadow-md p-4 flex flex-wrap gap-3">

  <input
    type="text"
    placeholder="Search orders..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="flex-1 min-w-[200px] bg-gray-100 px-4 py-2 rounded-lg text-sm"
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="bg-gray-100 px-3 py-2 rounded-lg text-sm"
  >
    <option>All</option>
    <option>Pending</option>
    <option>Preparing</option>
    <option>Delivered</option>
    <option>Rejected</option>
  </select>

  <select
    value={sort}
    onChange={(e) => setSort(e.target.value)}
    className="bg-gray-100 px-3 py-2 rounded-lg text-sm"
  >
    <option value="latest">Latest</option>
    <option value="oldest">Oldest</option>
  </select>

</div>

{/* ORDERS */}
<div className="bg-white rounded-xl shadow-md p-6 space-y-4">

  <div className="flex justify-between items-center">
    <h2 className="text-lg font-semibold">
      Orders
    </h2>
    <span className="text-sm text-gray-400">
      {filteredOrders.length} items
    </span>
  </div>

  {filteredOrders.length === 0 && (
    <div className="text-center py-20 text-gray-400">
      No orders yet
    </div>
  )}

  {filteredOrders.map(order => (

    <div
      key={order.id}
      className="bg-gray-50 border rounded-xl p-4 flex flex-col md:flex-row justify-between gap-4 hover:shadow-lg transition"
    >

      <div>
        <p className="font-semibold text-sm">
          Order #{order.id}
        </p>

        <p className="text-xs text-gray-500">
          {order.items.map(i => i.name).join(", ")}
        </p>

        <span className={`text-xs px-2 py-1 rounded-full font-medium
          ${order.status === "Pending" && "bg-yellow-100 text-yellow-700"}
          ${order.status === "Preparing" && "bg-blue-100 text-blue-700"}
          ${order.status === "Delivered" && "bg-green-100 text-green-700"}
          ${order.status === "Rejected" && "bg-red-100 text-red-700"}
        `}>
          {order.status}
        </span>

        <p className="text-[11px] text-gray-400">
          {getTimeAgo(order.createdAt)}
        </p>
      </div>

      <div className="flex gap-2 flex-wrap">

        <ActionBtn label="Accept" color="blue"
          onClick={() => updateOrderStatus(order.id, "Preparing")}
        />

        <ActionBtn label="Reject" color="red"
          onClick={() => updateOrderStatus(order.id, "Rejected")}
        />

        <ActionBtn label="Done" color="green"
          onClick={() => updateOrderStatus(order.id, "Delivered")}
        />

      </div>

    </div>

  ))}

</div>

</div>

{/* RIGHT PANEL */}
<div className="space-y-6">

  <div className="bg-white rounded-xl shadow-md p-5">
    <h3 className="font-semibold mb-3">Pending Orders</h3>

    {pendingOrders.length === 0 ? (
      <p className="text-xs text-gray-400">No pending</p>
    ) : (
      pendingOrders.map(o => (
        <div key={o.id} className="py-2 border-b text-sm">
          Order #{o.id}
        </div>
      ))
    )}
  </div>

  <div className="bg-white rounded-xl shadow-md p-5">
    <h3 className="font-semibold mb-3">Performance</h3>
    <p className="text-sm">Avg prep: --</p>
    <p className="text-sm">Top item: --</p>
    <p className="text-sm">Peak: --</p>
  </div>

  <div className="bg-white rounded-xl shadow-md p-5">
    <h3 className="font-semibold mb-3">Activity</h3>
    <p className="text-xs text-gray-400">
      Logs will appear here
    </p>
  </div>

</div>

</div>

</div>

</div>
  );
}

/* COMPONENTS */

function BigStat({ title, value }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-md">
      <p className="text-xs text-gray-500">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}

function ActionBtn({ label, color, onClick }) {
  const colors = {
    blue: "bg-blue-500 hover:bg-blue-600",
    red: "bg-red-500 hover:bg-red-600",
    green: "bg-green-500 hover:bg-green-600"
  };

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs text-white rounded-lg ${colors[color]}`}
    >
      {label}
    </button>
  );
}