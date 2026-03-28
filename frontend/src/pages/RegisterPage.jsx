import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

export default function RegisterPage(){

const navigate = useNavigate();

const [name,setName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleRegister = async (e) => {
  e.preventDefault(); // 🔥 IMPORTANT

try{

const res = await registerUser({
name,
email,
password
});

alert(res.message || "Registration successful");

navigate("/login");

}catch(err){

alert(err.message || "Registration failed");

}

};

return(

<div className="flex h-[calc(100vh-72px)] bg-gray-100">

{/* LEFT IMAGE 70% */}

<div
className="hidden md:block w-[70%] relative bg-cover bg-center"
style={{
backgroundImage:
"url(https://images.unsplash.com/photo-1504674900247-0877df9cc836)"
}}
>

{/* premium dark overlay */}

<div className="absolute inset-0 bg-black/30"></div>

</div>



{/* RIGHT FORM 30% */}

<div className="flex w-full md:w-[30%] items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 p-10">

<form
  onSubmit={handleRegister}
  className="bg-white/70 backdrop-blur-xl border border-white/30 
w-full max-w-md min-h-[560px] rounded-3xl 
shadow-[0_20px_60px_rgba(0,0,0,0.15)] 
p-10 flex flex-col justify-center 
transition-all duration-300"
>

<h2 className="text-3xl font-playfair text-darkred text-center mb-8">
Register
</h2>


<input
placeholder="Name"
value={name}
autoComplete="Name"
onChange={(e)=>setName(e.target.value)}
className="w-full px-5 py-4 border border-gray-300 rounded-xl bg-white/70 backdrop-blur-md 
focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none 
transition-all duration-200 shadow-sm focus:shadow-md mb-5"
/>


<input
placeholder="Email"
autoComplete="email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full p-4 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
/>


<input
  type="password"
  placeholder="Password"
  autoComplete="new-password"
  value={password}
  onChange={(e)=>setPassword(e.target.value)}
  className="w-full px-5 py-4 border border-gray-300 rounded-xl bg-white/70 backdrop-blur-md 
    focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all duration-200
    shadow-sm focus:shadow-md"
/>


<button
  type="submit"
className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 text-white py-4 rounded-xl 
text-lg font-semibold shadow-lg hover:shadow-2xl 
hover:scale-[1.02] active:scale-[0.97] 
transition-all duration-200"
>
Register
</button>


<p className="text-center text-sm text-gray-500 mt-8">

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