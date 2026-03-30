import { useState, useMemo, useEffect } from "react";

export default function VendorOrdersPage() {

  /* TIME (SAFE) */
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  /* MOCK DATA */
  const [orders, setOrders] = useState([
    {
      order_id: 101,
      status: "Pending",
      total_price: 180,
      createdAt: "2024-01-01T10:00:00",
      items: [{ item_name: "Burger" }, { item_name: "Fries" }]
    },
    {
      order_id: 102,
      status: "Preparing",
      total_price: 250,
      createdAt: "2024-01-01T09:50:00",
      items: [{ item_name: "Pizza" }]
    },
    {
      order_id: 103,
      status: "Delivered",
      total_price: 120,
      createdAt: "2024-01-01T09:30:00",
      items: [{ item_name: "Sandwich" }]
    }
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("latest");

  /* FILTER */
  const filteredOrders = useMemo(() => {
    let data = orders.filter(o =>
      (filter === "All" || o.status === filter) &&
      o.order_id.toString().includes(search)
    );

    return data.sort((a, b) =>
      sort === "latest" ? b.order_id - a.order_id : a.order_id - b.order_id
    );
  }, [orders, search, filter, sort]);

  /* STATUS UPDATE (SMART FLOW) */
  const updateStatus = (id, newStatus) => {
    setOrders(prev =>
      prev.map(order => {

        if (order.order_id !== id) return order;

        if (order.status === "Pending" && newStatus === "Preparing") {
          return { ...order, status: "Preparing" };
        }

        if (order.status === "Pending" && newStatus === "Cancelled") {
          return { ...order, status: "Cancelled" };
        }

        if (order.status === "Preparing" && newStatus === "Delivered") {
          return { ...order, status: "Delivered" };
        }

        return order;
      })
    );
  };

  /* TIME */
  function getTimeAgo(time) {
    const mins = Math.floor((currentTime - new Date(time)) / 60000);
    return `${mins} min ago`;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-6 space-y-6">

      {/* TOP BANNER */}
      <div className="bg-white border rounded-2xl px-4 sm:px-5 py-3 shadow-sm 
flex flex-col sm:flex-row items-center sm:justify-between gap-2 text-center sm:text-left">
        <p className="text-sm font-medium">
          🚧 Smart analytics & automation coming soon
        </p>
        <span className="text-xs border px-3 py-1 rounded-full">
          Coming Soon
        </span>
      </div>

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

  <div>
    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
      Vendor Orders
    </h1>
    <p className="text-sm text-gray-500">
      Real-time order management
    </p>
  </div>

  <button className="w-full sm:w-auto border px-4 py-2 rounded-xl text-sm">
    Online
  </button>

</div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <Stat title="Total Orders" value={orders.length} />
        <Stat title="Pending" value={orders.filter(o => o.status==="Pending").length} />
        <Stat title="Preparing" value={orders.filter(o => o.status==="Preparing").length} />
        <Stat title="Delivered" value={orders.filter(o => o.status==="Delivered").length} />
      </div>

      {/* CONTROLS */}
      <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search order..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-xl text-sm w-full sm:w-60"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2 rounded-xl text-sm w-full sm:w-auto" 
        >
          <option>All</option>
          <option>Pending</option>
          <option>Preparing</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border px-3 py-2 rounded-xl text-sm w-full sm:w-auto"
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm space-y-4">

          <h2 className="text-lg font-semibold">
            Orders ({filteredOrders.length})
          </h2>

          {filteredOrders.map(order => {

            const isPending = order.status === "Pending";
            const isPreparing = order.status === "Preparing";

            return (
              <div
                key={order.order_id}
                className="border rounded-xl p-4 flex flex-col sm:flex-row justify-between gap-3 hover:shadow-md transition"
              >

                {/* LEFT */}
                <div className="space-y-1">
                  <p className="font-semibold text-sm">
                    Order #{order.order_id}
                  </p>

                  <p className="text-xs text-gray-500">
                    {order.items.map(i => i.item_name).join(", ")}
                  </p>

                  <span className="text-[11px] px-2 py-1 border rounded-full">
                    {order.status}
                  </span>

                  <p className="text-[11px] text-gray-400">
                    {getTimeAgo(order.createdAt)}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex gap-2 flex-wrap justify-center sm:justify-start">

                  <button
                    disabled={!isPending}
                    onClick={() => updateStatus(order.order_id, "Preparing")}
                    className="px-3 py-1 border rounded-lg text-xs disabled:opacity-40"
                  >
                    Accept
                  </button>

                  <button
                    disabled={!isPending}
                    onClick={() => updateStatus(order.order_id, "Cancelled")}
                    className="px-3 py-1 border rounded-lg text-xs disabled:opacity-40"
                  >
                    Decline
                  </button>

                  <button
                    disabled={!isPreparing}
                    onClick={() => updateStatus(order.order_id, "Delivered")}
                    className="px-3 py-1 border rounded-lg text-xs disabled:opacity-40"
                  >
                    Done
                  </button>

                </div>

              </div>
            );
          })}

        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-4 sm:space-y-6">

          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <h3 className="text-sm font-semibold mb-2">
              Pending Orders
            </h3>

            {orders.filter(o => o.status==="Pending").length === 0 ? (
              <p className="text-xs text-gray-400">No pending orders</p>
            ) : (
              orders.filter(o => o.status==="Pending").map(o => (
                <p key={o.order_id} className="text-xs">
                  Order #{o.order_id}
                </p>
              ))
            )}
          </div>

          <div className="bg-white p-4 rounded-2xl shadow-sm">
            <h3 className="text-sm font-semibold mb-2">
              Performance
            </h3>
            <p className="text-xs">Avg prep time: --</p>
            <p className="text-xs">Orders/hour: --</p>
            <p className="text-xs">Peak time: --</p>
          </div>

        </div>

      </div>

    </div>
  );
}

/* STAT CARD */
function Stat({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition">
      <p className="text-xs text-gray-500">{title}</p>
      <h2 className="text-lg font-semibold">{value}</h2>
    </div>
  );
}