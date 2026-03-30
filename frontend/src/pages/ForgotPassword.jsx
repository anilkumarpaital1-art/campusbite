import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../services/api";

export default function ForgotPassword(){

const navigate = useNavigate();

const [email,setEmail] = useState("");
const [loading,setLoading] = useState(false);

const handleReset = async () => {

if(!email){
alert("Please enter your email");
return;
}

try{
setLoading(true);
await resetPassword({ email });

alert("Reset link sent to your email");
navigate("/login");

}catch(err){
alert(err.message || "Failed to send reset link");
}finally{
setLoading(false);
}

};

return(

<div className="min-h-screen flex items-start justify-center bg-gray-50 px-4 pt-[90px] sm:pt-[100px]">

{/* CARD */}

<div className="w-full max-w-md bg-white mt-4 sm:mt-0 rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-200">

{/* LOGO */}

<div className="text-center mb-5 sm:mb-6">
<h1 className="text-2xl sm:text-3xl font-playfair text-red-700">
🍔 Campus<span className="text-red-500">Bite</span>
</h1>
</div>

{/* TITLE */}

<h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-2">
Reset Password
</h2>

<p className="text-gray-500 text-xs sm:text-sm text-center mb-6 sm:mb-8">
Enter your email and we’ll send you a password reset link.
</p>


{/* EMAIL INPUT */}

<input
type="email"
placeholder="Enter your email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg mb-5 sm:mb-6 focus:outline-none focus:ring-2 focus:ring-red-500"
/>


{/* BUTTON */}

<button
onClick={handleReset}
disabled={loading}
className="w-full bg-red-600 text-white py-3 sm:py-4 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-60 active:scale-95"
>
{loading ? "Sending..." : "Send Reset Link"}
</button>


{/* BACK TO LOGIN */}

<p className="text-center text-xs sm:text-sm text-gray-500 mt-5 sm:mt-6">

Remember your password?

<button
onClick={()=>navigate("/login")}
className="text-red-600 font-semibold ml-1 hover:underline"
>
Login
</button>

</p>

</div>

</div>

);

}