import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      <Routes>
        <Route path="/" element={<AppLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/loyalty" element={<LoyaltyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<UserLogin />} />
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
    </Suspense>
  );
}

export default App;
