import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { loginUser } from "../services/authService";
import toast from "react-hot-toast";


export default function LoginPage(){

const { setUser, user } = useContext(AppContext);
const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [loading, setLoading] = useState(false);

/* REDIRECT IF ALREADY LOGGED IN */
useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!loading && (user || storedUser)) {
    navigate("/");
  }
}, [user, navigate, loading]);

/* LOGIN */
const handleLogin = async (e) => {
  e.preventDefault();

  if (loading) return; // 🚫 prevent double click

  setLoading(true);

  try {
    const res = await loginUser({ email, password });

    const userData = res.user;

    setUser(userData);
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(userData));

    toast.success("Login successful");
    navigate("/");

  } catch (err) {
    console.error("❌ Login error:", err);
    toast.error(err.message || "Login failed");
  }

  setLoading(false);
};

return(

<div className="flex flex-col md:flex-row min-h-[calc(100vh-72px)] bg-gray-100 pt-[72px] md:pt-0">

{/* LEFT IMAGE (HIDDEN ON MOBILE) */}
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
<div className="flex w-full md:w-[30%] items-center justify-center 
bg-gradient-to-br from-gray-50 to-gray-200 
px-4 sm:px-6 md:p-10 py-10">

<form
  onSubmit={handleLogin}
  className="bg-white/90 backdrop-blur-md 
  w-full max-w-md 
  min-h-[auto] md:min-h-[560px] 
  rounded-2xl shadow-2xl 
  p-6 sm:p-8 md:p-10 
  flex flex-col justify-center 
  border border-gray-200"
>

{/* TITLE */}
<h2 className="text-2xl sm:text-3xl font-playfair font-semibold text-red-800 text-center mb-8 sm:mb-10 tracking-wide">
Login
</h2>

{/* EMAIL */}
<input
placeholder="Email"
value={email}
autoComplete="email"
onChange={(e)=>setEmail(e.target.value)}
className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl mb-5 sm:mb-6 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-gray-700"
/>

{/* PASSWORD */}
<input
type="password"
placeholder="Password"
autoComplete="current-password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full p-3 sm:p-4 border border-gray-300 rounded-xl mb-3 sm:mb-4 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-gray-700"
/>

{/* FORGOT PASSWORD */}
<div className="text-center mb-6 sm:mb-8">
<Link
to="/forgot-password"
className="text-sm font-medium text-red-600 hover:text-red-700 transition"
>
Forgot Password?
</Link>
</div>

{/* LOGIN BUTTON */}
<button
type="submit"
disabled={loading} // ✅ ADD
className="w-full bg-red-600 text-white py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-red-700 transition shadow-md disabled:opacity-50"
>
{loading ? "Logging in..." : "Login"} {/* ✅ ADD */}
</button>

{/* REGISTER */}
<p className="text-center text-sm text-gray-500 mt-6 sm:mt-10">
Don't have an account?
<Link
to="/register"
className="text-red-600 font-semibold ml-1 hover:underline"
>
Register
</Link>
</p>

</form>

</div>

</div>

)
}