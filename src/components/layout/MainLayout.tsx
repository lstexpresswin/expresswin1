import React, { ReactNode } from "react";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/checkout");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleLanguageToggle = () => {
    // Toggle language logic would go here
    console.log("Language toggled");
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <Header
        onCartClick={handleCartClick}
        onProfileClick={handleProfileClick}
        onLanguageToggle={handleLanguageToggle}
      />
      <main className="pt-20">{children}</main>
    </div>
  );
};

export default MainLayout;
