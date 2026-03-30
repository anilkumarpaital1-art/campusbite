export default function NotFound(){

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 pt-[70px]">

  <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center max-w-md w-full">

    {/* BIG 404 */}
    <h1 className="text-5xl sm:text-6xl font-bold text-red-600 mb-4">
      404
    </h1>

    {/* TITLE */}
    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
      Page Not Found
    </h2>

    {/* DESC */}
    <p className="text-gray-500 text-sm sm:text-base mb-6">
      The page you are looking for doesn’t exist or has been moved.
    </p>

    {/* BUTTON */}
    <button
      onClick={() => window.location.href = "/"}
      className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition active:scale-95"
    >
      Go Home
    </button>

  </div>

</div>

)

}