import React, { useState } from "react";
import Header from "./layout/Header";
import CategoryGrid from "./menu/CategoryGrid";
import MenuItemGrid from "./menu/MenuItemGrid";
import LoyaltyBanner from "./loyalty/LoyaltyBanner";
import MainLayout from "./layout/MainLayout";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <LoyaltyBanner stamps={5} coins={120} />

        <MenuItemGrid selectedCategory={selectedCategory} />
      </div>
    </MainLayout>
  );
};

export default Home;
