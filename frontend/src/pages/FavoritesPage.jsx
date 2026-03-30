import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export default function FavoritesPage(){

const { favorites, addToCart } = useContext(AppContext);

return(

<div className="min-h-[80vh] bg-gray-100 py-6 sm:py-12 px-4 sm:px-14 pt-[50px] sm:pt-[55px]">

{/* HEADER */}

<h1 className="text-2xl sm:text-4xl font-semibold text-gray-800 mb-1 sm:mb-2">
  Favorites
</h1>

<p className="text-gray-500 text-xs sm:text-sm mb-6 sm:mb-10">
  Your favorite meals saved for quick ordering
</p>


{/* EMPTY STATE */}

{favorites.length === 0 && (

<div className="bg-white rounded-xl shadow-sm p-6 sm:p-12 text-center">

<h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2">
No Favorites Yet
</h3>

<p className="text-gray-500 text-xs sm:text-sm">
Add dishes to your favorites to quickly order them later.
</p>

</div>

)}


{/* FAVORITES GRID */}

<div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4 sm:gap-8">

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
className="w-full h-28 sm:h-40 object-cover"
/>

{/* HEART ICON */}

<div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-white p-1.5 sm:p-2 rounded-full shadow text-sm">
❤️
</div>

</div>


{/* CONTENT */}

<div className="p-3 sm:p-5 text-center">

<h3 className="font-semibold text-sm sm:text-lg text-gray-800 mb-1">
{food.name}
</h3>

<p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">
₹{food.price}
</p>


{/* BUTTON */}

<button
onClick={()=>addToCart(food)}
className="bg-red-600 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-red-700 transition active:scale-95"
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