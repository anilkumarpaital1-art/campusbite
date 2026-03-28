import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ProfileMenu from "./ProfileMenu";

function Navbar(){

const { user, mode } = useContext(AppContext);

/* LOGO CLICK */

const handleLogoClick = () => {
window.location.href = "/";
};

return(

<div className="w-full flex items-center justify-between px-8 py-4 bg-[#9b111e] text-white sticky top-0 z-50 shadow-lg">

{/* LOGO */}

<div
onClick={handleLogoClick}
className="flex items-center gap-2 text-[28px] font-bold cursor-pointer select-none tracking-wide"
>

<span className="text-[32px]">🍔</span>

<span>
Campus<span className="text-yellow-400 ml-1">Bite</span>
</span>

</div>


{/* NAV LINKS */}

<div className="flex items-center gap-8 text-[15px] font-medium">

{/* CUSTOMER MODE */}

{mode === "customer" && (

<>

<Link to="/" className="relative group pb-1">
Home
<span className="absolute left-0 bottom-0 w-full h-[2px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
</Link>

{user && (

<Link to="/select-location" className="relative group pb-1">
Restaurants
<span className="absolute left-0 bottom-0 w-full h-[2px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
</Link>

)}

</>

)}


{/* VENDOR MODE */}

{mode === "vendor" && (

<>

<Link to="/vendor-dashboard" className="relative group pb-1">
Dashboard
<span className="absolute left-0 bottom-0 w-full h-[2px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
</Link>

<Link to="/vendor-menu" className="relative group pb-1">
Menu
<span className="absolute left-0 bottom-0 w-full h-[2px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
</Link>


</>

)}


{/* LOGIN / REGISTER */}

{!user && (

<>

<Link to="/login" className="relative group pb-1">
Login
<span className="absolute left-0 bottom-0 w-full h-[2px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
</Link>

<Link to="/register" className="relative group pb-1">
Register
<span className="absolute left-0 bottom-0 w-full h-[2px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
</Link>

</>

)}

{/* PROFILE MENU */}

{user && <ProfileMenu/>}

</div>

</div>

);

}

export default Navbar;