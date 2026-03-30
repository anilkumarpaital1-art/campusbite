import { Routes, Route } from "react-router-dom";

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
  return (
    <AppLoader>
      <ScrollToTop />

       <div className="w-full min-h-screen overflow-x-hidden flex flex-col">

        {/* NAVBAR */}
        <Navbar />

<div className="pt-[70px]">
  <Routes />
</div>

        {/* MAIN CONTENT */}
        <main className="flex-grow w-full">
          <Routes>

            {/* HOME */}
            <Route path="/" element={<HomePage />} />

            {/* AUTH */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* RESTAURANTS */}
            <Route path="/restaurants" element={<RestaurantsPage />} />

            <Route
              path="/menu/:id"
              element={
                <ProtectedRoute>
                  <MenuPage />
                </ProtectedRoute>
              }
            />

            {/* CART */}
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

            {/* USER */}
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


            {/* LOCATION */}
            <Route path="/select-location" element={<LocationPage />} />
            <Route path="/restaurants/:location" element={<RestaurantsPage />} />

                {/* FAV */}
            <Route path="/favorites" element={<FavoritesPage />} />

            {/* VENDOR */}
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

            {/* 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </main>

        {/* GLOBAL COMPONENTS */}
        <SwitchCartModal />
        <FloatingCart />
        <Footer />

      </div>
    </AppLoader>
  );
}

export default App;