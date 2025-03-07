import React, { useEffect, useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import UserProfile from "../components/profile/UserProfile";
import OrderHistory from "../components/orders/OrderHistory";
import { Toaster } from "@/components/ui/toaster";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "محمد أحمد",
    phone: "0612345678",
    address: "شارع الحسن الثاني، الدار البيضاء",
    pin: "1234",
  });

  // Load user data from localStorage if available
  useEffect(() => {
    const savedUserData = localStorage.getItem("userProfile");
    if (savedUserData) {
      try {
        const parsedData = JSON.parse(savedUserData);
        setUserData(parsedData);
      } catch (error) {
        console.error("Error parsing user data from localStorage", error);
      }
    }
  }, []);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">الملف الشخصي</h1>

        {/* User Profile */}
        <div className="mb-6">
          <UserProfile
            name={userData.name}
            phone={userData.phone}
            address={userData.address}
            pin={userData.pin}
          />
        </div>

        {/* Order History */}
        <div className="mb-6">
          <OrderHistory />
        </div>

        {/* Toast notifications */}
        <Toaster />
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
