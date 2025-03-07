import { Suspense } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";
import LoyaltyPage from "./pages/LoyaltyPage";
import ProfilePage from "./pages/ProfilePage";
import CheckoutPage from "./pages/CheckoutPage";
import AdminLogin from "./pages/admin/Login";
import UserLogin from "./pages/admin/UserLogin";
import AppLogin from "./pages/AppLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OrderManagement from "./pages/admin/OrderManagement";
import LoyaltyCardManagement from "./pages/admin/LoyaltyCardManagement";
import GiftManagement from "./pages/admin/GiftManagement";
import CoinsManagement from "./pages/admin/CoinsManagement";
import MenuManagement from "./pages/admin/MenuManagement";
import UserManagement from "./pages/admin/UserManagement";
import FinancialManagement from "./pages/admin/FinancialManagement";
import POSSystem from "./pages/admin/POSSystem";
import { Toaster } from "./components/ui/toaster";

function App() {
  // Check if user is logged in
  const isUserLoggedIn = localStorage.getItem("userLoggedIn") === "true";
  const isAdminLoggedIn = sessionStorage.getItem("adminLoggedIn") === "true";

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          جاري التحميل...
        </div>
      }
    >
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      <Routes>
        <Route
          path="/"
          element={
            isUserLoggedIn ? <Navigate to="/home" replace /> : <AppLogin />
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/loyalty" element={<LoyaltyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            isAdminLoggedIn ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <UserLogin />
            )
          }
        />
        <Route path="/admin/login" element={<UserLogin />} />
        <Route path="/admin/dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="loyalty-cards" element={<LoyaltyCardManagement />} />
          <Route path="gifts" element={<GiftManagement />} />
          <Route path="coins" element={<CoinsManagement />} />
          <Route path="menu" element={<MenuManagement />} />
          <Route path="financial" element={<FinancialManagement />} />
          <Route path="pos" element={<POSSystem />} />
          <Route path="users" element={<UserManagement />} />
        </Route>

        {import.meta.env.VITE_TEMPO === "true" && <Route path="/tempobook/*" />}
      </Routes>
      <Toaster />
    </Suspense>
  );
}

export default App;
