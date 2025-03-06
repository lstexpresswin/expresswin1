import React, { useState } from "react";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import { Sheet, SheetContent } from "../ui/sheet";
import CartDrawer from "../cart/CartDrawer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Home, ShoppingCart, Diamond, Utensils, Settings } from "lucide-react";

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("menu");
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    switch (value) {
      case "menu":
        navigate("/");
        break;
      case "loyalty":
        navigate("/loyalty");
        break;
      case "orders":
        navigate("/");
        break;
      case "settings":
        navigate("/profile");
        break;
      case "cart":
        setIsCartOpen(true);
        break;
      default:
        navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" dir="rtl">
      {/* Header */}
      <Header
        cartItemCount={3}
        onCartClick={() => setIsCartOpen(true)}
        isRTL={true}
      />

      {/* Main Content */}
      <main className="flex-1 pt-20 pb-16">
        {/* Content */}
        {children || <Outlet />}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-md py-2 px-4">
        <Tabs
          defaultValue={activeTab}
          className="w-full"
          onValueChange={handleTabChange}
          value={activeTab}
        >
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger
              value="menu"
              className="flex flex-col items-center py-1"
            >
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">الرئيسية</span>
            </TabsTrigger>
            <TabsTrigger
              value="cart"
              className="flex flex-col items-center py-1"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="text-xs mt-1">السلة</span>
            </TabsTrigger>
            <TabsTrigger
              value="loyalty"
              className="flex flex-col items-center py-1"
            >
              <Diamond className="h-5 w-5" />
              <span className="text-xs mt-1">الولاء</span>
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="flex flex-col items-center py-1"
            >
              <Utensils className="h-5 w-5" />
              <span className="text-xs mt-1">الطلبات</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex flex-col items-center py-1"
            >
              <Settings className="h-5 w-5" />
              <span className="text-xs mt-1">الإعدادات</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Cart Drawer */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent side="left" className="w-full sm:w-[400px] p-0">
          <CartDrawer
            onClose={() => setIsCartOpen(false)}
            onCheckout={() => {
              setIsCartOpen(false);
              navigate("/checkout");
            }}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MainLayout;
