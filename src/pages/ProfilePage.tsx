import React from "react";
import MainLayout from "../components/layout/MainLayout";
import UserProfile from "../components/profile/UserProfile";
import OrderHistory from "../components/orders/OrderHistory";

const ProfilePage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">الملف الشخصي</h1>

        {/* User Profile */}
        <div className="mb-6">
          <UserProfile
            name="محمد أحمد"
            phone="0612345678"
            address="شارع الحسن الثاني، الدار البيضاء"
            pin="1234"
          />
        </div>

        {/* Order History */}
        <div className="mb-6">
          <OrderHistory />
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;
