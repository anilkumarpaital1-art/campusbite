import { Routes, Route } from "react-router-dom";

import { useContext } from "react";
import { AppContext } from "./context/AppContext";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";
import AppLoader from "./components/AppLoader";
import FloatingCart from "./components/FloatingCart";
import SwitchCartModal from "./components/SwitchCartModal";

/* USER PAGES */
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPassword";

import LocationPage from "./pages/LocationPage";
import RestaurantsPage from "./pages/RestaurantsPage";
import MenuPage from "./pages/MenuPage";

import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";

import ProfilePage from "./pages/ProfilePage";
import FavoritesPage from "./pages/FavoritesPage";
import CustomerRoute from "./components/CustomerRoute";

/* VENDOR PAGES */
import VendorLoginPage from "./pages/VendorLoginPage";
import VendorDashboard from "./pages/VendorDashboard";
import VendorRegisterPage from "./pages/VendorRegisterPage";
import VendorOrdersPage from "./pages/VendorOrdersPage";
import VendorProfilePage from "./pages/VendorProfilePage";
import VendorMenuPage from "./pages/VendorMenuPage";

/* MISC */
import NotFound from "./pages/NotFound";

function App() {

  const { loading } = useContext(AppContext); // ✅ ADD THIS
  const location = useLocation();

  if (loading) {
    return (
    <div className="p-6 space-y-4 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/3"></div>
      <div className="h-40 bg-gray-300 rounded"></div>
      <div className="h-40 bg-gray-300 rounded"></div>
      <div className="h-40 bg-gray-300 rounded"></div>
    </div>
    );
  }

  return (
    <>
      <ScrollToTop />

       <div className="w-full min-h-screen overflow-x-hidden flex flex-col">

        {/* NAVBAR */}
<Navbar />

<main className="flex-grow w-full pt-[70px]">
  <motion.div
    key={location.pathname}   // 🔥 IMPORTANT FIX
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Routes>

    <Route path="/" element={<HomePage />} />

    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />

    <Route path="/restaurants" element={<RestaurantsPage />} />

    <Route
      path="/menu/:id"
      element={
        <ProtectedRoute>
          <MenuPage />
        </ProtectedRoute>
      }
    />

    <Route
      path="/cart"
      element={
        <ProtectedRoute>
          <CartPage />
        </ProtectedRoute>
      }
    />

    <Route
      path="/checkout/:id"
      element={
        <ProtectedRoute>
          <CustomerRoute>
            <CheckoutPage />
          </CustomerRoute>
        </ProtectedRoute>
      }
    />

    <Route
      path="/orders"
      element={
        <ProtectedRoute>
          <OrdersPage />
        </ProtectedRoute>
      }
    />

    <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      }
    />

    <Route path="/select-location" element={<LocationPage />} />
    <Route path="/restaurants/:location" element={<RestaurantsPage />} />
    <Route path="/favorites" element={<FavoritesPage />} />

    <Route path="/vendor-login" element={<VendorLoginPage />} />
    <Route path="/vendor-register" element={<VendorRegisterPage />} />
    <Route path="/vendor-orders" element={<VendorOrdersPage />} />
    <Route path="/vendor-profile" element={<VendorProfilePage />} />
    <Route path="/vendor-menu" element={<VendorMenuPage />} />

    <Route
      path="/vendor-dashboard"
      element={
        <ProtectedRoute>
          <VendorDashboard />
        </ProtectedRoute>
      }
    />

    <Route path="*" element={<NotFound />} />

    </Routes>
  </motion.div>
</main>

        {/* GLOBAL COMPONENTS */}
        <SwitchCartModal />
        <FloatingCart />
        <Footer />

      </div>
    </>
  );
}

export default App;