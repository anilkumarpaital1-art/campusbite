export default function CartItem({ item, increase, decrease }) {

return (

<div className="bg-white px-5 py-3 rounded-xl flex justify-between items-center shadow-sm hover:shadow-md transition mb-3">

{/* ITEM INFO */}

<div>

<h3 className="font-semibold text-gray-800">
{item.name}
</h3>

<p className="text-gray-500 text-sm">
₹{item.price}
</p>

</div>


{/* QUANTITY CONTROLS */}

<div className="flex items-center gap-2">

<button
onClick={() => decrease(item.id)}
className="bg-red-600 text-white w-6 h-6 text-sm rounded flex items-center justify-center hover:bg-red-700 transition"
>
-
</button>

<span className="font-semibold text-sm text-gray-800">
{item.quantity}
</span>

<button
onClick={() => increase(item.id)}
className="bg-red-600 text-white w-6 h-6 text-sm rounded flex items-center justify-center hover:bg-red-700 transition"
>
+
</button>

</div>

</div>

);

}