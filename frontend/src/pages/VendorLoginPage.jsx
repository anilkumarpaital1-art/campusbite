import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { vendorLogin } from "../services/api";
import { AppContext } from "../context/AppContext";

function VendorLoginPage(){

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const navigate = useNavigate();

const { switchToVendor } = useContext(AppContext);

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogin = async () => {
  if (!email || !password) {
    setError("Please fill all fields");
    return;
  }

  try {
    setLoading(true);
    setError("");

    const res = await vendorLogin({ email, password });

    if (res.success) {
      switchToVendor(res.vendor);
      navigate("/vendor-dashboard");
    } else {
      setError(res.message || "Login failed");
    }

  } catch (err) {
    console.error(err);
    setError("Server error");
  } finally {
    setLoading(false);
  }
};


return(

<div className="min-h-screen flex">

{/* LEFT SIDE */}

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
Access your restaurant dashboard to manage orders,
update menu items, and track your restaurant performance.
</p>

<div className="flex justify-center gap-16 text-6xl">

<div className="cursor-pointer hover:-translate-y-4 hover:scale-110 transition duration-300">
🍔
</div>

<div className="cursor-pointer hover:-translate-y-4 hover:scale-110 transition duration-300">
🍕
</div>

<div className="cursor-pointer hover:-translate-y-4 hover:scale-110 transition duration-300">
🍜
</div>

</div>

</div>

</div>


{/* LOGIN FORM */}

<div className="w-[30%] bg-white flex items-center justify-center px-10">

<div className="w-full max-w-sm">

<h2 className="text-3xl font-semibold text-gray-800 mb-2">
Vendor Login
</h2>

<p className="text-gray-500 text-sm mb-6">
Login to manage your restaurant
</p>

<form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-4">

<input
type="email"
placeholder="Email"
autoComplete="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
/>

<input
type="password"
placeholder="Password"
autoComplete="current-password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-400 outline-none"
/>

{error && (
  <p className="text-red-500 text-sm">{error}</p>
)}

<button 
  type="submit"
  disabled={loading}
  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition"
>
  {loading ? "Logging in..." : "Login"}
</button>

</form>


<p
className="text-sm text-orange-500 cursor-pointer mt-4 text-center"
onClick={()=>navigate("/forgot-password")}
>
Forgot Password?
</p>


<p className="text-sm text-gray-600 mt-4 text-center">
Don't have vendor account?
<span
onClick={()=>navigate("/vendor-register")}
className="text-orange-500 cursor-pointer font-semibold ml-1"
>
Register
</span>
</p>

</div>

</div>

</div>

);

}

export default VendorLoginPage;