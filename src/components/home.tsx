import React, { useState } from "react";
import MainLayout from "./layout/MainLayout";
import CategoryGrid from "./menu/CategoryGrid";
import MenuItemGrid from "./menu/MenuItemGrid";
import LoyaltyBanner from "./loyalty/LoyaltyBanner";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Loyalty Banner */}
        <div onClick={() => navigate("/loyalty")} className="cursor-pointer">
          <LoyaltyBanner stamps={5} coins={120} />
        </div>

        {/* Category Selection */}
        <CategoryGrid
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* Menu Items */}
        <MenuItemGrid selectedCategory={selectedCategory} />
      </div>
    </MainLayout>
  );
};

export default Home;
