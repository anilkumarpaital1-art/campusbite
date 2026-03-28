import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { loginUser } from "../services/authService";

export default function LoginPage(){

const { setUser, user } = useContext(AppContext);
const navigate = useNavigate();

const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

/* REDIRECT IF ALREADY LOGGED IN */

useEffect(()=>{

const storedUser = localStorage.getItem("user");

if(user || storedUser){
navigate("/");
}

},[user,navigate]);

/* LOGIN */

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await loginUser({
      email,
      password
    });
    

    const userData = res.user;

    // ✅ SAVE USER
    setUser(userData);

    // ✅ SAVE TOKEN + USER
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(userData));

    console.log("✅ Logged in user:", userData);

    alert("Login successful");
    navigate("/");

  } catch (err) {
    console.error("❌ Login error:", err);
    alert(err.message || "Login failed");
  }
};

return(

<div className="flex h-[calc(100vh-72px)] bg-gray-100">

{/* LEFT IMAGE */}

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

<div className="flex w-full md:w-[30%] items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-10">

<form
  onSubmit={handleLogin}
  className="bg-white/90 backdrop-blur-md w-full max-w-md min-h-[560px] rounded-2xl shadow-2xl p-10 flex flex-col justify-center border border-gray-200"
>

{/* TITLE */}

<h2 className="text-3xl font-playfair font-semibold text-red-800 text-center mb-10 tracking-wide">
Login
</h2>


{/* EMAIL */}

<input
placeholder="Email"
value={email}
autoComplete="Email"
onChange={(e)=>setEmail(e.target.value)}
className="w-full p-4 border border-gray-300 rounded-xl mb-6 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none text-gray-700"
/>


{/* PASSWORD */}

<input
type="password"
placeholder="Password"
autoComplete="current-password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="w-full p-4 border border-gray-300 rounded-xl mb-4 
focus:ring-2 focus:ring-red-500 focus:border-red-500 
outline-none text-gray-700"
/>

{/* FORGOT PASSWORD */}

<div className="text-center mb-8">

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
className="w-full bg-red-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-red-700 transition shadow-md"
>
Login
</button>


{/* REGISTER */}

<p className="text-center text-sm text-gray-500 mt-10">

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