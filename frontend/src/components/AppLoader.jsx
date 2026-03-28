import { useEffect, useState } from "react";
import "../styles/appLoader.css";

function AppLoader({ children }) {

const [loading, setLoading] = useState(true);

useEffect(() => {

const timer = setTimeout(() => {
setLoading(false);
}, 1200);   // matches animation time

return () => clearTimeout(timer);

}, []);

if (loading) {

return (

<div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-200 z-50">

{/* LOGO */}

<div className="flex items-center gap-3 text-4xl font-playfair font-bold mb-10 animate-fadeIn">

<span className="text-5xl animate-bounce">🍔</span>

<span className="text-red-900 tracking-wide">
Campus<span className="text-red-600">Bite</span>
</span>

</div>

{/* PROGRESS BAR */}

<div className="w-80 h-3 bg-gray-300 rounded-full overflow-hidden shadow-inner">

<div className="progress-bar h-full rounded-full"></div>

</div>

<p className="mt-4 text-gray-500 text-sm tracking-wide">

Preparing your delicious experience...

</p>

</div>

);

}

return children;

}

export default AppLoader;