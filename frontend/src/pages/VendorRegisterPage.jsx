import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vendorRegister } from "../services/api";

function VendorRegisterPage(){

const navigate = useNavigate();



const [name,setName] = useState("");
const [restaurant,setRestaurant] = useState("");
const [email,setEmail] = useState("");
const [phone,setPhone] = useState("");
const [password,setPassword] = useState("");

const handleRegister = async (e) => {
  e.preventDefault();   // 👈 important

  console.log("FORM SUBMITTED"); // 🔥 debug

  if (!name || !restaurant || !email || !phone || !password) {
    alert("Please fill all details");
    return;
  }

  // 🔥 ADD THIS BELOW
if (!email.includes("@")) {
  alert("Enter valid email");
  return;
}

  try {
    const res = await vendorRegister({
      ownerName: name,
      restaurantName: restaurant,
      email,
      phone,
      password,
      address: "Not Provided"
    });

    console.log("API RESPONSE:", res); // 🔥 debug

    if (res.success) {
      alert("Registered successfully");
      navigate("/vendor-login");
    } else {
      alert(res.message);
    }

  } catch (err) {
    console.error(err);
    alert("Registration failed");
  }
};


return(

<div className="min-h-screen flex">

{/* LEFT SECTION */}

<div
className="w-[70%] relative flex items-center justify-center text-white"
style={{
backgroundImage:"url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1600')",
backgroundSize:"cover",
backgroundPosition:"center"
}}
>

<div className="absolute inset-0 bg-orange-600/80"></div>

<div className="relative text-center max-w-xl px-10">

<h1
className="text-6xl font-bold mb-6"
style={{fontFamily:"'Playfair Display', serif"}}
>
CampusBite Partner
</h1>

<p className="text-lg opacity-95 mb-12 leading-relaxed">
Join CampusBite and sell food to thousands of students.
Manage orders, update menus and grow your restaurant.
</p>

<div className="flex justify-center gap-16 text-6xl">

<div className="hover:-translate-y-3 transition">🍔</div>
<div className="hover:-translate-y-3 transition">🍕</div>
<div className="hover:-translate-y-3 transition">🍜</div>

</div>

</div>

</div>


{/* RIGHT SECTION */}

<div className="w-[30%] bg-white flex items-center justify-center px-10">

<div className="w-full max-w-sm">

<h2 className="text-3xl font-semibold mb-2">
Vendor Registration
</h2>

<p className="text-gray-500 text-sm mb-6">
Create your restaurant account
</p>


{/* REGISTRATION FORM */}

<form onSubmit={handleRegister} className="space-y-4">

<input
placeholder="Owner Name"
autoComplete="name"
value={name}
onChange={(e)=>setName(e.target.value)}
className="w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
/>

<input
placeholder="Restaurant Name"
autoComplete="organization"
value={restaurant}
onChange={(e)=>setRestaurant(e.target.value)}
className="w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
/>

<input
placeholder="Email"
autoComplete="email" 
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
/>

<input
placeholder="Phone"
autoComplete="tel" 
value={phone}
onChange={(e)=>setPhone(e.target.value)}
className="w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
/>

<input
type="password"
placeholder="Password"
autoComplete="new-password" 
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full border border-gray-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
/>

<button 
type="submit"
className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
>
Register Restaurant
</button>

</form>


{/* LOGIN REDIRECT */}

<p className="text-sm text-gray-600 mt-4 text-center">
Already have a vendor account?
<span
onClick={()=>navigate("/vendor-login")}
className="text-orange-500 cursor-pointer font-semibold ml-1"
>
Login
</span>
</p>


</div>

</div>

</div>

);

}

export default VendorRegisterPage;