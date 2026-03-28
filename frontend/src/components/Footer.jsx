import { Link } from "react-router-dom";
function Footer() {

return (

<footer className="bg-[#7b0f1a] text-white">

  <div className="max-w-[1400px] mx-auto px-8 py-12 grid md:grid-cols-4 gap-10">

    {/* 🔥 BRAND */}
    <div>
      <h2 className="text-2xl font-bold">
        Campus<span className="text-yellow-400">Bite</span>
      </h2>
      <p className="text-sm mt-3 text-gray-200 leading-6">
        Smart food ordering platform designed for Chandigarh University. 
        Skip queues, order instantly, and enjoy campus dining.
      </p>
    </div>

    {/* 🔥 QUICK LINKS */}
    <div>
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
    <div>
      <h3 className="font-semibold text-lg mb-3">Contact</h3>
      <ul className="space-y-2 text-sm text-gray-200">
        <li>📧 campusbite@gmail.com</li>
        <li>📞 +91 9876543210</li>
        <li>📍 Chandigarh University</li>
      </ul>
    </div>

    {/* 🔥 HOURS */}
    <div>
      <h3 className="font-semibold text-lg mb-3">Working Hours</h3>
      <p className="text-sm text-gray-200">
        Mon - Sun: 9:00 AM – 9:00 PM
      </p>

      <div className="flex gap-4 mt-4 text-lg">
        <span className="hover:text-yellow-400 cursor-pointer">🌐</span>
        <span className="hover:text-yellow-400 cursor-pointer">📱</span>
        <span className="hover:text-yellow-400 cursor-pointer">💬</span>
      </div>
    </div>

  </div>

  {/* 🔥 BOTTOM BAR */}
  <div className="border-t border-white/20 text-center py-4 text-sm text-gray-200">
    © 2026 CampusBite • All Rights Reserved
  </div>

</footer>

);

}

export default Footer;