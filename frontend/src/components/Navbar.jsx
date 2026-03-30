import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import ProfileMenu from "./ProfileMenu";
import { useState } from "react";

function Navbar(){

  const [open, setOpen] = useState(false);

  

const { user, mode } = useContext(AppContext);

/* LOGO CLICK */

const handleLogoClick = () => {
window.location.href = "/";
};

return(

<div className="w-full flex items-center justify-between px-4 sm:px-8 py-4 bg-[#9b111e] text-white fixed top-0 left-0 z-50 shadow-lg">

  {/* LEFT SIDE (HAMBURGER + LOGO) */}
  <div className="flex items-center gap-3">

    {/* HAMBURGER */}
    <div 
      className="sm:hidden text-2xl cursor-pointer"
      onClick={()=>setOpen(true)}
    >
      ☰
    </div>

    {/* LOGO */}
    <div
      onClick={handleLogoClick}
      className="flex items-center gap-2 text-[24px] sm:text-[28px] font-bold cursor-pointer select-none tracking-wide"
    >
      <span className="text-[28px] sm:text-[32px]">🍔</span>
      <span>
        Campus<span className="text-yellow-400 ml-1">Bite</span>
      </span>
    </div>

  </div>

{open && (
  <div className="fixed inset-0 z-50 flex">

    {/* LEFT MENU */}
    <div className={`w-[250px] bg-[#9b111e] text-white p-6 flex flex-col gap-6 text-lg font-medium transform transition-transform duration-300 ${
  open ? "translate-x-0" : "-translate-x-full"
}`}>

      <button onClick={()=>setOpen(false)} className="text-right text-xl">
        ✕
      </button>

      {mode === "customer" && (
        <>
          <Link to="/" onClick={()=>setOpen(false)}>Home</Link>

          {user && (
            <Link to="/select-location" onClick={()=>setOpen(false)}>
              Restaurants
            </Link>
          )}
        </>
      )}

      {mode === "vendor" && (
        <>
          <Link to="/vendor-dashboard" onClick={()=>setOpen(false)}>Dashboard</Link>
          <Link to="/vendor-menu" onClick={()=>setOpen(false)}>Menu</Link>
        </>
      )}

      {!user && (
        <>
          <Link to="/login" onClick={()=>setOpen(false)}>Login</Link>
          <Link to="/register" onClick={()=>setOpen(false)}>Register</Link>
        </>
      )}

    </div>

    {/* BACKDROP */}
    <div 
      className="flex-1 bg-black/40"
      onClick={()=>setOpen(false)}
    ></div>

  </div>
)}

{/* NAV LINKS (HIDDEN ON MOBILE) */}

<div className="hidden sm:flex items-center gap-8 text-[15px] font-medium">

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


{/* MOBILE RIGHT SIDE (ONLY PROFILE MENU) */}

<div className="flex sm:hidden items-center">
{user && <ProfileMenu/>}
</div>

</div>

);

}

export default Navbar;