import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RestaurantsPage() {

  const { location } = useParams();  // ✅ ADD THIS

  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ✅ FETCH FROM API */
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/restaurants/${location}`
        );
        const data = await res.json();

        console.log("FULL API DATA:", data);

        setRestaurants(Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        console.error("❌ Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, [location]);

  const getRandomRating = (id) => {
  const seed = id * 9301 + 49297;
  const random = (seed % 233280) / 233280;
  return (3.5 + random * 1.5).toFixed(1); // 3.5 – 5.0
};

  /* ✅ LOADING STATE */
  if (loading) {
    return (
      <div className="text-center py-20 text-lg">
        Loading restaurants...
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-gray-100">

    {/* 🔥 HEADER SECTION */}
   <div className="max-w-7xl mx-auto px-6 pt-10 pb-6">

      <h2 className="text-4xl font-extrabold text-gray-800 flex items-center gap-3">
        <span className="bg-black text-white px-3 py-1 rounded-lg text-xl">
          🍽
        </span>

        Restaurants in 
        <span className="text-yellow-500 drop-shadow-sm">
          {location}
        </span>
      </h2>

      <p className="text-gray-500 mt-3 text-sm">
        Discover top-rated places to eat around you
      </p>

    </div>

    {/* 🔥 GRID */}
    <div className="max-w-7xl mx-auto px-6 pb-10">

      <div className={`grid gap-8
        ${restaurants.length === 1 
          ? "grid-cols-1 justify-items-center" 
          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >

        {restaurants.map((restaurant) => (

          <div
            key={restaurant.canteen_id}
            onClick={() => navigate(`/menu/${restaurant.canteen_id}`)}
            className={`bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col
            ${restaurants.length === 1 ? "w-full max-w-[340px]" : "w-full"}
          `}
          >

            {/* 🔥 IMAGE (FIXED HEIGHT SAME EVERYWHERE) */}
            <div className="h-44 w-full overflow-hidden">
              <img
                src={
                  restaurant.banner_image
                    ? `http://localhost:5000${restaurant.banner_image}`
                    : "/fallback.jpg"
                }
                alt={restaurant.name}
                className="w-full h-full object-cover hover:scale-105 transition duration-300"
              />
            </div>

            {/* 🔥 CONTENT */}
            <div className="p-4 flex flex-col justify-between flex-1">

              {/* TOP */}
              <div>

                <h3 className="font-semibold text-lg text-gray-800 truncate hover:text-yellow-500 transition">
                  {restaurant.name}
                </h3>

                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wide">
                  {restaurant.category || "Multi Cuisine"}
                </p>

              </div>

              {/* BOTTOM */}
              <div className="flex items-center justify-between mt-4">

                {/* RATING */}
                <span className="flex items-center gap-1 bg-green-600 text-white text-xs px-2 py-1 rounded-md font-semibold shadow">
                  ★ {Number(restaurant.rating) > 0
                    ? restaurant.rating
                    : getRandomRating(restaurant.canteen_id)}
                </span>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  </div>
)};