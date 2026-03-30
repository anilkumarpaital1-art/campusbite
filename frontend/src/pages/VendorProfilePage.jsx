import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";

function VendorProfilePage(){

const { vendorRestaurant } = useContext(AppContext);

/* ================= STATE ================= */

const [isOpen,setIsOpen] = useState(() => {
  return JSON.parse(localStorage.getItem("isOpen")) ?? true;
});

const [restaurant,setRestaurant] = useState(() => {
  return JSON.parse(localStorage.getItem("restaurant")) || {
    name:"Campus Cafe",
    location:"University Campus",
    open:"8:00 AM",
    close:"10:00 PM"
  };
});

const [settings,setSettings] = useState(() => {
  return JSON.parse(localStorage.getItem("settings")) || {
    autoAccept:false,
    notifications:true
  };
});

const [image,setImage] = useState(() => {
  return localStorage.getItem("image") || null;
});

/* MODALS */
const [showEdit,setShowEdit] = useState(false);
const [showSettings,setShowSettings] = useState(false);

/* ================= SAVE ================= */

useEffect(()=>{ localStorage.setItem("isOpen",JSON.stringify(isOpen)); },[isOpen]);
useEffect(()=>{ localStorage.setItem("restaurant",JSON.stringify(restaurant)); },[restaurant]);
useEffect(()=>{ localStorage.setItem("settings",JSON.stringify(settings)); },[settings]);
useEffect(()=>{ if(image) localStorage.setItem("image",image); },[image]);

/* ================= IMAGE ================= */

function handleImage(e){
  const file = e.target.files[0];
  if(file){
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  }
}

/* ================= SETTINGS TOGGLE ================= */

function toggleSetting(key){
  setSettings(prev => ({
    ...prev,
    [key]: !prev[key]
  }));
}

return(

<div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-6 space-y-6">

{/* HEADER */}
<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">

  <div>
    <h1 className="text-2xl sm:text-3xl font-bold">🏪 My Restaurant</h1>
    <p className="text-sm text-gray-500">Manage profile & settings</p>
  </div>

  <button
    onClick={()=>setIsOpen(!isOpen)}
    className={`w-full sm:w-auto px-5 py-2 rounded-xl text-sm shadow
      ${isOpen ? "bg-green-500 text-white" : "bg-red-500 text-white"}
    `}
  >
    {isOpen ? "Open" : "Closed"}
  </button>

</div>

{/* GRID */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

{/* LEFT */}
<div className="bg-white rounded-3xl shadow-lg overflow-hidden">

  <div className="relative h-40 sm:h-44 bg-gray-200 flex items-center justify-center">
    {image ? <img src={image} className="w-full h-full object-cover"/> : "Upload Image"}

    <label className="absolute bottom-3 right-3 bg-white px-3 py-1 rounded-full text-xs shadow cursor-pointer">
      Change
      <input type="file" onChange={handleImage} className="hidden"/>
    </label>
  </div>

  <div className="p-6 space-y-3">

    <h2 className="text-xl font-semibold">{restaurant.name}</h2>
    <p className="text-xs text-gray-500">ID: {vendorRestaurant}</p>

    <p className="text-sm">
      {isOpen ? "🟢 Accepting Orders" : "🔴 Closed"}
    </p>

    <div className="grid grid-cols-2 gap-3 pt-2">

      <button
        onClick={()=>setShowEdit(true)}
        className="bg-gray-100 hover:bg-gray-200 py-2 rounded-xl text-sm"
      >
        Edit
      </button>

      <button
        onClick={()=>setShowSettings(true)}
        className="bg-gray-100 hover:bg-gray-200 py-2 rounded-xl text-sm"
      >
        Settings
      </button>

    </div>

  </div>

</div>

{/* RIGHT */}
<div className="lg:col-span-2 space-y-4 sm:space-y-6">

<div className="bg-white p-6 rounded-2xl shadow border">
<h3 className="font-semibold mb-4">Details</h3>

<Row label="Name" value={restaurant.name}/>
<Row label="Location" value={restaurant.location}/>
<Row label="Opening" value={restaurant.open}/>
<Row label="Closing" value={restaurant.close}/>

</div>

<div className="bg-white p-6 rounded-2xl shadow border">
<h3 className="font-semibold mb-4">Settings</h3>

<Row label="Auto Accept" value={settings.autoAccept ? "On" : "Off"}/>
<Row label="Notifications" value={settings.notifications ? "On" : "Off"}/>

</div>

</div>

</div>

{/* ================= EDIT MODAL ================= */}
{showEdit && (
<div className="fixed inset-0 bg-black/30 flex items-center justify-center">

<div className="bg-white p-6 rounded-2xl w-[90%] sm:w-96 space-y-3">

<h2 className="font-semibold text-lg">Edit Restaurant</h2>

<input
value={restaurant.name}
onChange={(e)=>setRestaurant({...restaurant,name:e.target.value})}
className="border w-full p-2 rounded"
/>

<input
value={restaurant.location}
onChange={(e)=>setRestaurant({...restaurant,location:e.target.value})}
className="border w-full p-2 rounded"
/>

<input
value={restaurant.open}
onChange={(e)=>setRestaurant({...restaurant,open:e.target.value})}
className="border w-full p-2 rounded"
/>

<input
value={restaurant.close}
onChange={(e)=>setRestaurant({...restaurant,close:e.target.value})}
className="border w-full p-2 rounded"
/>

<div className="flex gap-2 pt-2">
<button onClick={()=>setShowEdit(false)} className="flex-1 bg-green-500 text-white py-2 rounded">Save</button>
<button onClick={()=>setShowEdit(false)} className="flex-1 bg-gray-200 py-2 rounded">Cancel</button>
</div>

</div>
</div>
)}

{/* ================= SETTINGS MODAL ================= */}
{showSettings && (
<div className="fixed inset-0 bg-black/30 flex items-center justify-center">

<div className="bg-white p-6 rounded-2xl w-[90%] sm:w-96 space-y-4">

<h2 className="font-semibold text-lg">Settings</h2>

<Toggle label="Auto Accept Orders" value={settings.autoAccept} onClick={()=>toggleSetting("autoAccept")}/>
<Toggle label="Notifications" value={settings.notifications} onClick={()=>toggleSetting("notifications")}/>

<button
onClick={()=>setShowSettings(false)}
className="w-full bg-gray-200 py-2 rounded"
>
Close
</button>

</div>
</div>
)}

</div>
);
}

/* COMPONENTS */

function Row({label,value}){
return(
<div className="flex justify-between border-b py-2">
<p className="text-gray-500">{label}</p>
<p className="font-medium">{value}</p>
</div>
);
}

function Toggle({label,value,onClick}){
return(
<div className="flex justify-between items-center">
<p>{label}</p>
<button
onClick={onClick}
className={`px-3 py-1 rounded-full text-xs ${
value ? "bg-green-500 text-white" : "bg-gray-200"
}`}
>
{value ? "ON" : "OFF"}
</button>
</div>
);
}

export default VendorProfilePage;