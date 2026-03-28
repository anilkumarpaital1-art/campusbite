import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function FavoritesPage(){

const { favorites, addToCart } = useContext(AppContext);

return(

<div className="min-h-[80vh] bg-gray-100 py-12 px-14">

{/* HEADER */}

<h1 className="text-4xl font-semibold text-gray-800 mb-1">
Favorites
</h1>

<p className="text-gray-500 text-sm mb-10">
Your favorite meals saved for quick ordering
</p>


{/* EMPTY STATE */}

{favorites.length === 0 && (

<div className="bg-white rounded-xl shadow-sm p-12 text-center">

<h3 className="text-xl font-semibold text-gray-700 mb-2">
No Favorites Yet
</h3>

<p className="text-gray-500 text-sm">
Add dishes to your favorites to quickly order them later.
</p>

</div>

)}


{/* FAVORITES GRID */}

<div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-8">

{favorites.map((food,index)=>(

<div
key={index}
className="bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-200"
>

{/* IMAGE */}

<div className="relative">

<img
src={food.image}
alt={food.name}
className="w-full h-40 object-cover"
/>

{/* HEART ICON */}

<div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">

❤️

</div>

</div>


{/* CONTENT */}

<div className="p-5 text-center">

<h3 className="font-semibold text-lg text-gray-800 mb-1">
{food.name}
</h3>

<p className="text-gray-500 text-sm mb-4">
₹{food.price}
</p>


{/* BUTTON */}

<button
onClick={()=>addToCart(food)}
className="bg-red-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-red-700 transition"
>
Add to Cart
</button>

</div>

</div>

))}

</div>

</div>

)

}