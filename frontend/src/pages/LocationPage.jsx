import { useNavigate } from "react-router-dom";

export default function LocationPage() {
  const navigate = useNavigate();

  const locations = ["A1", "A3", "FR", "D6", "C3", "DSW", "D4", "G2"];

  const handleSelect = (loc) => {
    localStorage.setItem("location", loc);
    navigate(`/restaurants/${loc}`);
  };

  return (
    <div className="min-h-screen flex items-start sm:items-center justify-center px-4 pt-[90px] sm:pt-0 relative bg-gray-50">

      {/* LIGHT GLOW */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#facc15,_transparent_60%)] opacity-10"></div>

      {/* MAIN WRAPPER */}
      <div className="w-full max-w-3xl">

        {/* HEADER */}
        <div className="mb-8 sm:mb-12 text-center">

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">

            <span className="text-gray-900">
              Choose Your{" "}
            </span>

            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-sm">
              Location
            </span>

          </h1>

          <p className="text-gray-500 mt-2 sm:mt-4 text-xs sm:text-sm md:text-base tracking-wide">
            Pick your campus zone to continue
          </p>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-5">

          {locations.map((loc) => (
            <button
              key={loc}
              onClick={() => handleSelect(loc)}
              className="group relative h-16 sm:h-20 rounded-xl sm:rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-center overflow-hidden hover:-translate-y-1 hover:scale-[1.03] active:scale-95"
            >

              {/* TEXT */}
              <span className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-yellow-500 transition z-10 tracking-wide">
                {loc}
              </span>

              {/* BOTTOM LINE */}
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-yellow-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

              {/* GLOW */}
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-100/40 to-transparent opacity-0 group-hover:opacity-100 transition"></div>

            </button>
          ))}

        </div>

      </div>

    </div>
  );
}