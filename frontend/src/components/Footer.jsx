import { Link } from "react-router-dom";

function Footer() {

return (

<footer className="bg-[#7b0f1a] text-white">

  <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-6 sm:py-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-10">

    {/* 🔥 BRAND */}
    <div className="col-span-2 sm:col-span-1 text-center sm:text-left space-y-1 sm:space-y-2">
      <h2 className="text-lg sm:text-2xl font-bold">
        Campus<span className="text-yellow-400">Bite</span>
      </h2>

      {/* ❌ HIDE DESCRIPTION ON MOBILE */}
      <p className="hidden sm:block text-sm mt-2 text-gray-200 leading-relaxed">
        Smart food ordering platform designed for Chandigarh University. 
        Skip queues, order instantly, and enjoy campus dining.
      </p>
    </div>

    {/* 🔥 QUICK LINKS (HIDE ON MOBILE) */}
    <div className="hidden sm:block text-center sm:text-left space-y-2">
      <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
      <ul className="space-y-2 text-sm text-gray-200">

        <li>
          <Link to="/" className="hover:text-yellow-400 transition">
            Home
          </Link>
        </li>

        <li>
          <Link to="/select-location" className="hover:text-yellow-400 transition">
            Restaurants
          </Link>
        </li>

        <li>
          <Link to="/cart" className="hover:text-yellow-400 transition">
            Cart
          </Link>
        </li>

        <li>
          <Link to="/orders" className="hover:text-yellow-400 transition">
            Orders
          </Link>
        </li>

      </ul>
    </div>

    {/* 🔥 CONTACT */}
    <div className="text-left space-y-1 sm:space-y-2 col-span-1">
      <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">Contact</h3>
      <ul className="space-y-1 sm:space-y-2 text-[12px] sm:text-sm text-gray-200">
        <li>📧 campusbite@gmail.com</li>
        <li>📞 +91 9876543210</li>
        <li>📍 Chandigarh University</li>
      </ul>
    </div>

    {/* 🔥 HOURS */}
<div className="text-center sm:text-left space-y-1 sm:space-y-2 col-span-1">

  <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">
    Working Hours
  </h3>

  {/* MOBILE CLEAN LAYOUT */}
  <div className="text-[12px] sm:text-sm text-gray-200 leading-tight">
    <p className="font-medium">Mon - Sun</p>
    <p className="text-gray-300">9:00 AM – 9:00 PM</p>
  </div>

  {/* ICONS */}
  <div className="flex justify-center sm:justify-start items-center gap-4 mt-2 sm:mt-3 text-base sm:text-xl">
    <span className="hover:text-yellow-400 cursor-pointer">🌐</span>
    <span className="hover:text-yellow-400 cursor-pointer">📱</span>
    <span className="hover:text-yellow-400 cursor-pointer">💬</span>
  </div>

</div>

  </div>

  {/* 🔥 PROFESSIONAL BOTTOM BAR */}
  <div className="border-t border-white/20">

    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] sm:text-sm text-gray-300">

      {/* LEFT */}
      <p>
        © 2026 CampusBite. All rights reserved.
      </p>

      {/* RIGHT (HIDE ON MOBILE OPTIONAL) */}
      <div className="hidden sm:flex gap-6">

        <span className="hover:text-yellow-400 cursor-pointer">Privacy Policy</span>
        <span className="hover:text-yellow-400 cursor-pointer">Terms</span>
        <span className="hover:text-yellow-400 cursor-pointer">Support</span>

      </div>

    </div>

  </div>

</footer>

);

}

export default Footer;