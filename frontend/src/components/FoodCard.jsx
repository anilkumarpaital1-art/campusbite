import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function FoodCard({ id, name, price, image, veg, restaurantId, restaurantName }) {

  const {
  user,
  favorites = [],
  toggleFavorite,
  addToCart,
  setActiveCanteen,
  effectiveCanteen   // ✅ include here
} = useContext(AppContext);


const isDifferentRestaurant =
  effectiveCanteen &&
  Number(effectiveCanteen) !== Number(restaurantId);

  const isFavorite = favorites.some(f => f.id === id);

  console.log("ACTIVE:", effectiveCanteen, "CLICKED:", restaurantId);

  const handleAddToCart = () => {

  console.log("🧪 CLICK DATA:", {
    id,
    name,
    restaurantId,
    restaurantName
  });

  if (!user) {
    alert("Please login first");
    return;
  }

  if (!restaurantId) {
    console.error("❌ Missing restaurantId in FoodCard:", name);
    return;
  }

  // ✅ Set active only first time
  if (!effectiveCanteen) {
    setActiveCanteen(Number(restaurantId));
  }

  // 🚨 Just call addToCart once
  // (AppContext will handle switch modal)
  addToCart({
    id,
    name,
    price,
    image,
    veg,
    restaurantId: Number(restaurantId),
    restaurantName
  });
};

  return (
    <div className="bg-white rounded-2xl p-4 text-center shadow-lg hover:-translate-y-1 hover:shadow-xl transition relative">

      {/* FAVORITE */}
      <div
        className="absolute top-3 right-3 text-xl cursor-pointer"
        onClick={() => toggleFavorite({ id, name, price, image, veg })}
      >
        {isFavorite ? "❤️" : "🤍"}
      </div>

      {/* VEG/NONVEG */}
      <div className="absolute top-3 left-3">
        {veg ? (
          <div className="w-5 h-5 border-2 border-green-600 bg-white relative">
            <div className="w-3 h-3 bg-green-600 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        ) : (
          <div className="w-5 h-5 border-2 border-red-600 bg-white relative">
            <div className="w-3 h-3 bg-red-600 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        )}
      </div>

      <img
        src={image || "/fallback.jpg"}
        alt={name}
        className="w-full h-[160px] object-cover rounded-lg"
      />

      <h3 className="mt-3 text-lg font-semibold">{name}</h3>

      <p className="font-semibold text-gray-600">₹{price}</p>

    {isDifferentRestaurant && (
      <p className="text-xs text-red-500 mt-2">
        Items already in cart from another restaurant
      </p>
    )}

    <button
      onClick={handleAddToCart}
      className={`mt-3 px-4 py-2 rounded-lg text-white transition w-full
        ${
          isDifferentRestaurant
            ? "bg-gray-400 hover:bg-gray-500"
            : "bg-red-600 hover:bg-red-800"
        }
      `}
    >
      {isDifferentRestaurant ? "Switch Restaurant" : "Add to Cart"}
    </button>

    </div>
  );
}

export default FoodCard;