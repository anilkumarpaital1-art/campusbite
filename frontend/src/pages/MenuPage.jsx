
import { AppContext } from "../context/AppContext";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import { getMenu } from "../services/api";


// ✅ OUTSIDE COMPONENT (STABLE)
const nonVegCategories = [5, 6, 7, 42, 75];

export default function MenuPage() {


  const { id } = useParams();

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [vegFilter, setVegFilter] = useState("all");
  const [sort, setSort] = useState("default");

  /* ================= SET ACTIVE CANTEEN ================= */


  /* ================= FETCH MENU ================= */

  // ✅ FETCH MENU
  useEffect(() => {
    if (!id) return;

    const fetchMenu = async () => {
      try {
        const data = await getMenu(id);
        setFoods(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Menu fetch error:", err);
        setFoods([]);
      }
    };

    fetchMenu();
  }, [id]);

  // ✅ SET ACTIVE CANTEEN (NEW)

  /* ================= FILTER + SORT ================= */

  const filteredFoods = useMemo(() => {

    let result = foods.filter((food) => {

      const matchSearch =
        food.item_name?.toLowerCase().includes(search.toLowerCase());

      const matchVeg =
        vegFilter === "all" ||
        (vegFilter === "veg" && !nonVegCategories.includes(food.category_id)) ||
        (vegFilter === "nonveg" && nonVegCategories.includes(food.category_id));

      return matchSearch && matchVeg;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;

  }, [foods, search, vegFilter, sort]); // ✅ FIXED

  /* ================= UI ================= */

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <h1 className="text-3xl font-playfair text-darkred mb-8 text-center">
        Menu
      </h1>

      {/* FILTER */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">

        <div className="flex items-center gap-3 flex-wrap">

          <button
            className={`px-4 py-2 rounded-full border ${
              vegFilter === "veg" ? "bg-green-600 text-white" : "bg-white"
            }`}
            onClick={() => setVegFilter("veg")}
          >
            Veg
          </button>

          <button
            className={`px-4 py-2 rounded-full border ${
              vegFilter === "nonveg" ? "bg-red-600 text-white" : "bg-white"
            }`}
            onClick={() => setVegFilter("nonveg")}
          >
            Non-Veg
          </button>

          <button
            className={`px-4 py-2 rounded-full border ${
              vegFilter === "all" ? "bg-gray-800 text-white" : "bg-white"
            }`}
            onClick={() => setVegFilter("all")}
          >
            All
          </button>

          <select
            className="border rounded-lg px-3 py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort</option>
            <option value="low">Price Low → High</option>
            <option value="high">Price High → Low</option>
          </select>

        </div>

        <input
          className="border rounded-lg px-4 py-2 w-[220px]"
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* GRID */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-8">

        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => {

            if (!food.canteen_id) {
              console.error("❌ Missing canteen_id:", food);
              return null;
            }

            const restaurantId = Number(food.canteen_id);

            console.log("FOOD RESTAURANT:", restaurantId);

            return (
              <FoodCard
                key={food.item_id}
                id={food.item_id}
                name={food.item_name}
                price={food.price}
                image={food.image || "/default-food.jpg"}
                veg={!nonVegCategories.includes(food.category_id)}
                restaurantId={restaurantId}
                restaurantName={`Canteen ${food.canteen_id}`}
              />
            );
          })
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No items found 🍽️
          </p>
        )}

      </div>

    </div>
  );
}