import { AppContext } from "../context/AppContext";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import FoodCard from "../components/FoodCard";
import { getMenu } from "../services/api";

const nonVegCategories = [5, 6, 7, 42, 75];

export default function MenuPage() {

  const { id } = useParams();

  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [vegFilter, setVegFilter] = useState("all");
  const [sort, setSort] = useState("default");

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

    if (sort === "low") result.sort((a, b) => a.price - b.price);
    if (sort === "high") result.sort((a, b) => b.price - a.price);

    return result;

  }, [foods, search, vegFilter, sort]);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-10">

      {/* TITLE */}
      <h1 className="text-xl sm:text-3xl font-playfair text-darkred mb-4 sm:mb-8 text-center">
        Menu
      </h1>

      {/* FILTER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-8">

        <div className="flex flex-wrap gap-2">

          <button
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-full border ${
              vegFilter === "veg" ? "bg-green-600 text-white" : "bg-white"
            }`}
            onClick={() => setVegFilter("veg")}
          >
            Veg
          </button>

          <button
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-full border ${
              vegFilter === "nonveg" ? "bg-red-600 text-white" : "bg-white"
            }`}
            onClick={() => setVegFilter("nonveg")}
          >
            Non-Veg
          </button>

          <button
            className={`px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base rounded-full border ${
              vegFilter === "all" ? "bg-gray-800 text-white" : "bg-white"
            }`}
            onClick={() => setVegFilter("all")}
          >
            All
          </button>

          <select
            className="border rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="default">Sort</option>
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </select>

        </div>

        <input
          className="border rounded-lg px-3 sm:px-4 py-1.5 sm:py-2 w-full sm:w-[220px] text-sm"
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* GRID */}
      <div className="
        grid 
        grid-cols-2 
        sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] 
        gap-3 sm:gap-6 md:gap-8
      ">

        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => {

            if (!food.canteen_id) return null;

            return (
              <div className="scale-[0.95] sm:scale-100 origin-top">
                <FoodCard
                  key={food.item_id}
                  id={food.item_id}
                  name={food.item_name}
                  price={food.price}
                  image={food.image || "/default-food.jpg"}
                  veg={!nonVegCategories.includes(food.category_id)}
                  restaurantId={Number(food.canteen_id)}
                  restaurantName={`Canteen ${food.canteen_id}`}
                />
              </div>
            );
          })
        ) : (
          <p className="text-center col-span-full text-gray-500 text-sm">
            No items found 🍽️
          </p>
        )}

      </div>

    </div>
  );
}