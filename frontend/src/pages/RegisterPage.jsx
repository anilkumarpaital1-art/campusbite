import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import toast from "react-hot-toast";

export default function RegisterPage(){

const navigate = useNavigate();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [loading, setLoading] = useState(false);

const handleRegister = async (e) => {
  e.preventDefault();

  if (loading) return; // 🚫 prevent double click

  setLoading(true);

  try {
    const res = await registerUser({
      name,
      email,
      password
    });



    toast.success(res.message || "Registration successful");
    navigate("/login");

  } catch (err) {
    alert(err.message || "Registration failed");
  }

  setLoading(false);
};

return(

<div className="flex flex-col md:flex-row min-h-screen md:h-[calc(100vh-72px)] bg-gray-100 pt-[72px] md:pt-0">

{/* LEFT IMAGE (DESKTOP ONLY) */}

<div
className="hidden md:block w-[70%] relative bg-cover bg-center"
style={{
backgroundImage:
"url(https://images.unsplash.com/photo-1504674900247-0877df9cc836)"
}}
>
<div className="absolute inset-0 bg-black/30"></div>
</div>


{/* RIGHT FORM */}

<div className="flex w-full md:w-[30%] items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 px-4 py-6 md:p-10">

<form
  onSubmit={handleRegister}
  className="
  bg-white/80 backdrop-blur-xl border border-white/30 
  w-full max-w-md 
  rounded-3xl 
  shadow-[0_20px_60px_rgba(0,0,0,0.15)] 
  px-6 py-8 md:p-10 
  flex flex-col justify-center 
  transition-all duration-300
  "
>

<h2 className="text-2xl md:text-3xl font-playfair text-darkred text-center mb-6 md:mb-8">
Register
</h2>


<input
placeholder="Name"
value={name}
autoComplete="name"
onChange={(e)=>setName(e.target.value)}
className="w-full px-4 md:px-5 py-3 md:py-4 border border-gray-300 rounded-xl bg-white/70 
focus:ring-2 focus:ring-red-500 outline-none 
transition-all duration-200 shadow-sm mb-4 md:mb-5"
/>


<input
placeholder="Email"
autoComplete="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full px-4 md:px-5 py-3 md:py-4 border border-gray-300 rounded-xl 
focus:ring-2 focus:ring-red-500 outline-none mb-4 md:mb-5"
/>


<input
type="password"
placeholder="Password"
autoComplete="new-password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full px-4 md:px-5 py-3 md:py-4 border border-gray-300 rounded-xl bg-white/70 
focus:ring-2 focus:ring-red-500 outline-none transition-all duration-200 shadow-sm"
/>


<button
type="submit"
disabled={loading} // ✅ ADD THIS
className="w-full mt-5 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 md:py-4 rounded-xl 
text-base md:text-lg font-semibold shadow-lg hover:shadow-2xl 
hover:scale-[1.02] active:scale-[0.97] 
transition-all duration-200 disabled:opacity-50"
>
{loading ? "Registering..." : "Register"} {/* ✅ ADD THIS */}
</button>


<p className="text-center text-sm text-gray-500 mt-6 md:mt-8">

Already have an account?

<Link
to="/login"
className="text-red-600 font-semibold ml-1 hover:underline"
>
Login
</Link>

</p>

</form>

</div>

</div>

)

}