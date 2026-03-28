import { useState, useEffect } from "react";

function VendorMenuPage(){

const restaurantId = 1;

const [menu,setMenu] = useState([]);
const [newItem,setNewItem] = useState("");
const [newPrice,setNewPrice] = useState("");

/* FETCH MENU */
const fetchMenu = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/menu/${restaurantId}`);
    const data = await res.json();
    setMenu(Array.isArray(data) ? data : data.data || []);
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  async function loadMenu() {
    try {
      const res = await fetch(`http://localhost:5000/api/menu/${restaurantId}`);
      const data = await res.json();
      setMenu(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error(err);
    }
  }

  loadMenu();
}, [restaurantId]);

/* ADD ITEM */
async function addMenuItem(){

if(!newItem || !newPrice) return;

const res = await fetch("http://localhost:5000/api/menu/add",{
  method:"POST",
  headers:{ "Content-Type":"application/json" },
  body: JSON.stringify({
    canteen_id: restaurantId,
    item_name: newItem,
    price: newPrice
  })
});

const data = await res.json();

if(data.success){
  fetchMenu();
}

setNewItem("");
setNewPrice("");
}

/* TOGGLE */
async function setAvailability(id,value){

await fetch("http://localhost:5000/api/menu/toggle",{
  method:"POST",
  headers:{ "Content-Type":"application/json" },
  body: JSON.stringify({
    item_id:id,
    available:value
  })
});

fetchMenu(); // ✅ no reload
}

/* FALLBACK IMAGE */
const fallbackImg = "https://via.placeholder.com/400x250?text=Food";

return (

<div className="min-h-screen bg-gray-50 px-8 py-6 space-y-6">

{/* 🚧 COMING SOON */}
<div className="bg-white border rounded-xl px-5 py-3 shadow-sm flex justify-between items-center">
  <p className="text-sm font-medium">
    🚧 Smart menu insights & automation coming soon
  </p>
  <span className="text-xs bg-gray-100 px-3 py-1 rounded-full">
    Coming Soon
  </span>
</div>

{/* HEADER */}
<div>
  <h1 className="text-3xl font-bold text-gray-800">
    🍽️ Restaurant Menu
  </h1>
  <p className="text-sm text-gray-500">
    Manage items, pricing & availability
  </p>
</div>

{/* MENU GRID */}
<div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

{menu.length === 0 && (
  <div className="col-span-full text-center py-16 text-gray-400">
    No menu items yet
  </div>
)}

{menu.map(item => {

const isAvailable = item.available === 1 || item.available === true;

return (

  <div 
    key={item.item_id} 
    className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden border"
  >

    {/* IMAGE */}
    <div className="relative">
      <img
        src={item.image || fallbackImg}
        alt={item.item_name}
        className="w-full h-44 object-cover"
        onError={(e)=> e.target.src = fallbackImg}
      />

      {/* STATUS BADGE */}
      <span className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-medium shadow
        ${isAvailable ? "bg-green-500 text-white" : "bg-red-500 text-white"}
      `}>
        {isAvailable ? "Available" : "Unavailable"}
      </span>
    </div>

    {/* CONTENT */}
    <div className="p-4 space-y-2">

      <h3 className="text-sm font-semibold text-gray-800">
        {item.item_name}
      </h3>

      <p className="text-sm font-medium text-gray-600">
        ₹{item.price}
      </p>

      {/* BUTTONS */}
      <div className="flex gap-2 pt-3">

        <button
          disabled={isAvailable}
          onClick={()=>setAvailability(item.item_id,1)}
          className={`flex-1 py-1.5 text-xs rounded-lg transition
            ${isAvailable
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white shadow-sm"
            }`}
        >
          Available
        </button>

        <button
          disabled={!isAvailable}
          onClick={()=>setAvailability(item.item_id,0)}
          className={`flex-1 py-1.5 text-xs rounded-lg transition
            ${!isAvailable
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 text-white shadow-sm"
            }`}
        >
          Unavailable
        </button>

      </div>

    </div>

  </div>

);
})}

</div>

{/* ADD ITEM */}
<div className="bg-white p-6 rounded-2xl shadow-sm max-w-xl border">

<h2 className="text-lg font-semibold mb-4">
➕ Add New Item
</h2>

<div className="flex gap-3">

<input
placeholder="Food name"
value={newItem}
onChange={(e)=>setNewItem(e.target.value)}
className="flex-1 border px-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-green-400 outline-none"
/>

<input
placeholder="Price"
value={newPrice}
onChange={(e)=>setNewPrice(e.target.value)}
className="w-28 border px-4 py-2 rounded-lg text-sm focus:ring-2 focus:ring-green-400 outline-none"
/>

<button
onClick={addMenuItem}
className="bg-green-500 hover:bg-green-600 text-white px-5 rounded-lg text-sm transition shadow-sm"
>
Add
</button>

</div>

</div>

</div>

);

}

export default VendorMenuPage;