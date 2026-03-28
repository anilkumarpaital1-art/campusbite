import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function ProfileMenu(){

const {
logout,
mode,
switchToVendor,
switchToCustomer,
vendorRestaurant
} = useContext(AppContext);

const navigate = useNavigate();

const [open,setOpen] = useState(false);
const menuRef = useRef(null);

const closeMenu = ()=> setOpen(false);

const goTo = (path)=>{
navigate(path);
closeMenu();
};

const handleLogout = ()=>{
logout();
navigate("/");
closeMenu();
};

const handleVendorMode = ()=>{
switchToVendor();
navigate("/vendor-dashboard");
closeMenu();
};

const handleCustomerMode = ()=>{
switchToCustomer();
navigate("/");
closeMenu();
};


/* CLOSE MENU ON OUTSIDE CLICK */

useEffect(()=>{

const handleClickOutside = (event)=>{
if(menuRef.current && !menuRef.current.contains(event.target)){
setOpen(false);
}
};

document.addEventListener("mousedown",handleClickOutside);

return ()=>{
document.removeEventListener("mousedown",handleClickOutside);
};

},[]);


return(

<div className="relative" ref={menuRef}>

{/* PROFILE ICON */}

<div
className="w-9 h-9 bg-white text-[#9b111e] rounded-full flex items-center justify-center cursor-pointer font-bold hover:bg-yellow-400 hover:text-black transition duration-300"
onClick={()=>setOpen(!open)}
>
👤
</div>


{/* DROPDOWN MENU */}

{open && (

<div className="absolute right-0 top-full mt-2 w-56 bg-white text-gray-800 rounded-xl shadow-2xl border z-[9999] overflow-hidden">

{/* CUSTOMER MODE */}

{mode === "customer" && (

<>

<button onClick={()=>goTo("/profile")} className="menu-btn">
My Profile
</button>

<button onClick={()=>goTo("/orders")} className="menu-btn">
Orders
</button>

<button onClick={()=>goTo("/favorites")} className="menu-btn">
Favorites
</button>

{!vendorRestaurant && (

<button
onClick={()=>goTo("/vendor-register")}
className="menu-btn"
>
Register Restaurant
</button>

)}

{vendorRestaurant && (

<button
onClick={handleVendorMode}
className="menu-btn text-blue-600 font-semibold"
>
Switch to Vendor Dashboard
</button>

)}

<button
onClick={handleLogout}
className="menu-btn text-red-500"
>
Logout
</button>

</>

)}


{/* VENDOR MODE */}

{mode === "vendor" && (

<>

<button
onClick={()=>goTo("/vendor-dashboard")}
className="menu-btn"
>
Dashboard
</button>

<button
onClick={()=>goTo("/vendor-orders")}
className="menu-btn"
>
Orders
</button>

<button
onClick={()=>goTo("/vendor-profile")}
className="menu-btn"
>
My Restaurant
</button>

<button
onClick={handleCustomerMode}
className="menu-btn text-blue-600"
>
Switch to Customer Mode
</button>

<button
onClick={handleLogout}
className="menu-btn text-red-500"
>
Logout
</button>

</>

)}

</div>

)}

</div>

);

}

export default ProfileMenu;