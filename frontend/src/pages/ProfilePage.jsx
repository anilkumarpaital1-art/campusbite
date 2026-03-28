import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

export default function ProfilePage(){

const { user, setUser, orders, favorites } = useContext(AppContext);

const [editing,setEditing] = useState(false);
const [name,setName] = useState(user?.name || "");
const [email,setEmail] = useState(user?.email || "");

const saveProfile = () => {

const updatedUser = {
...user,
name,
email
};

setUser(updatedUser);
localStorage.setItem("user", JSON.stringify(updatedUser));
setEditing(false);

};


const totalSpent = orders.length
  ? orders.reduce(
      (sum, order) => sum + Number(order.total_price ?? 0),
      0
    )
  : 0;


const sortedOrders = [...orders].sort(
  (a, b) => new Date(b.order_time) - new Date(a.order_time)
);

return(

<div className="min-h-screen bg-gray-100">

{/* PROFILE BANNER */}

<div className="h-40 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 shadow-md"></div>


<div className="px-16 -mt-16 pb-10">


{/* PROFILE HEADER */}

<div className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-start">

<div className="flex gap-5 items-start">

{/* AVATAR */}

<div className="relative">

<div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white flex items-center justify-center text-3xl font-bold shadow-lg">
{user?.name?.charAt(0).toUpperCase()}
</div>

<label className="absolute bottom-0 right-0 bg-white rounded-full shadow p-1 cursor-pointer text-xs">
📷
<input type="file" className="hidden"/>
</label>

</div>


<div>

<h2 className="text-xl font-semibold text-gray-800">
{user?.name}
</h2>

<p className="text-sm text-gray-500 mb-3">
{user?.email}
</p>

{editing && (

<div className="space-y-2 w-[260px]">

<input
className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
value={name}
onChange={(e)=>setName(e.target.value)}
placeholder="Name"
/>

<input
className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-red-500 outline-none"
value={email}
onChange={(e)=>setEmail(e.target.value)}
placeholder="Email"
/>

<div className="flex gap-2 pt-1">

<button
className="bg-red-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-red-700 transition"
onClick={saveProfile}
>
Save
</button>

<button
className="border border-gray-300 px-4 py-1.5 rounded-md text-sm hover:bg-gray-100"
onClick={()=>setEditing(false)}
>
Cancel
</button>

</div>

</div>

)}

{!editing && (

<button
className="text-red-600 text-sm font-medium hover:underline"
onClick={()=>setEditing(true)}
>
Edit Profile
</button>

)}

</div>

</div>

<div className="text-right">

<p className="text-xs text-gray-500">
Member Since
</p>

<p className="text-sm font-semibold text-gray-700">
2026
</p>

</div>

</div>


{/* STATS */}

<div className="grid grid-cols-4 gap-5 mt-8">

<div className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition">
<p className="text-xs text-gray-500">Total Orders</p>
<p className="text-xl font-bold text-gray-800">{orders.length}</p>
</div>

<div className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition">
<p className="text-xs text-gray-500">Favorites</p>
<p className="text-xl font-bold text-gray-800">{favorites.length}</p>
</div>

<div className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition">
<p className="text-xs text-gray-500">Total Spent</p>
<p className="text-xl font-bold text-gray-800">₹{totalSpent}</p>
</div>

<div className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition">
<p className="text-xs text-gray-500">Last Order</p>
<p className="text-sm font-semibold text-gray-800">
{sortedOrders[0]?.order_time
  ? new Date(sortedOrders[0].order_time).toLocaleDateString()
  : "—"}
</p>
</div>

</div>


{/* MAIN GRID */}

<div className="grid grid-cols-[1.4fr_1fr] gap-6 mt-8">


{/* LEFT SIDE */}

<div className="space-y-6">

<div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">

<h3 className="text-lg font-semibold text-gray-800 mb-4">
Account Information
</h3>

<div className="grid grid-cols-2 gap-4 text-sm text-gray-600">

<p>
<span className="font-medium text-gray-700">Name:</span> {user?.name}
</p>

<p>
<span className="font-medium text-gray-700">Email:</span> {user?.email}
</p>

<p>
<span className="font-medium text-gray-700">Orders Placed:</span> {orders.length}
</p>

<p>
<span className="font-medium text-gray-700">Favorites:</span> {favorites.length}
</p>

</div>

</div>


<div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">

<h3 className="text-lg font-semibold text-gray-800 mb-2">
Saved Favorites
</h3>

<p className="text-sm text-gray-600">
You currently have <span className="font-semibold">{favorites.length}</span> favorite restaurants saved.
</p>

</div>


<div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">

<h3 className="text-lg font-semibold text-gray-800 mb-3">
CampusBite Benefits
</h3>

<ul className="text-sm text-gray-600 space-y-2">

<li>✔ Faster campus food ordering</li>
<li>✔ Save favorite restaurants</li>
<li>✔ Secure online payments</li>
<li>✔ Easy order tracking</li>

</ul>

</div>

</div>


{/* RIGHT SIDE */}

<div className="space-y-6">

<div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">

<h3 className="text-lg font-semibold text-gray-800 mb-4">
Food Activity
</h3>

<div className="space-y-3 text-sm text-gray-600">

<p>🍔 Orders placed: <span className="font-medium">{orders.length}</span></p>
<p>⭐ Favorite restaurants: <span className="font-medium">{favorites.length}</span></p>
<p>💰 Total spent: <span className="font-medium">₹{totalSpent.toFixed(2)}</span></p>
<p>🕒 Last order: <span className="font-medium">{sortedOrders[0]?.order_time
  ? new Date(sortedOrders[0].order_time).toLocaleDateString()
  : "—"}</span></p>

</div>

</div>


<div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">

<h3 className="text-lg font-semibold text-gray-800 mb-2">
Account Status
</h3>

<p className="text-sm text-gray-600">
Active CampusBite user since 2026.
</p>

</div>


<div className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-xl shadow-md p-6">

<h3 className="font-semibold mb-2">
CampusBite Member
</h3>

<p className="text-sm opacity-90">
Enjoy faster checkout, saved restaurants, and seamless campus food ordering.
</p>

</div>

</div>

</div>

</div>

</div>

)
}