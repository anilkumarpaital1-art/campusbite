function RestaurantCard({ name, cuisine, image }) {

return (

<div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden cursor-pointer w-[220px]">

{/* IMAGE */}

{image && (

<img
src={image}
className="w-full h-40 object-cover"
/>

)}

{/* CONTENT */}

<div className="p-4">

<h3 className="font-semibold text-lg">
{name}
</h3>

<p className="text-gray-500 text-sm">
{cuisine}
</p>

</div>

</div>

);

}

export default RestaurantCard;