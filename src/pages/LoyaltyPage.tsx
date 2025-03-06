import React from "react";
import MainLayout from "../components/layout/MainLayout";
import LoyaltyBanner from "../components/loyalty/LoyaltyBanner";
import LoyaltyCard from "../components/loyalty/LoyaltyCard";
import GiftCard from "../components/loyalty/GiftCard";
import CoinsBalance from "../components/loyalty/CoinsBalance";

const LoyaltyPage = () => {
  // Sample data
  const loyaltyCards = [
    {
      id: "1234567",
      name: "بطاقة الوجبات الرئيسية",
      description: "اجمع 7 طوابع واحصل على وجبة رئيسية مجانية",
      stamps: 5,
      maxStamps: 7,
      reward: "وجبة رئيسية مجانية",
    },
    {
      id: "7654321",
      name: "بطاقة المشروبات",
      description: "اجمع 5 طوابع واحصل على مشروب مجاني",
      stamps: 3,
      maxStamps: 5,
      reward: "مشروب مجاني",
    },
    {
      id: "9876543",
      name: "بطاقة الحلويات",
      description: "اجمع 6 طوابع واحصل على حلوى مجانية",
      stamps: 2,
      maxStamps: 6,
      reward: "حلوى مجانية",
    },
  ];

  const giftCards = [
    {
      id: "12345",
      name: "مشروب مجاني",
      description: "احصل على أي مشروب مجاني مع طلبك التالي",
      code: "12345",
      expiryDate: "2023-12-31",
    },
    {
      id: "54321",
      name: "خصم 10%",
      description: "احصل على خصم 10% على طلبك التالي",
      code: "54321",
      expiryDate: "2023-11-30",
    },
    {
      id: "98765",
      name: "حلوى مجانية",
      description: "احصل على حلوى مجانية مع طلبك التالي",
      code: "98765",
      expiryDate: "2023-12-15",
    },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">برنامج الولاء</h1>

        {/* Loyalty Banner */}
        <LoyaltyBanner stamps={10} coins={250} />

        {/* Coins Balance */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">رصيد الكوينز</h2>
          <CoinsBalance balance={250} />
        </div>

        {/* Loyalty Cards */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">بطاقات الولاء</h2>
          <div className="space-y-4">
            {loyaltyCards.map((card) => (
              <LoyaltyCard
                key={card.id}
                id={card.id}
                name={card.name}
                description={card.description}
                stamps={card.stamps}
                maxStamps={card.maxStamps}
                reward={card.reward}
              />
            ))}
          </div>
        </div>

        {/* Gift Cards */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">الهدايا السريعة</h2>
          <div className="space-y-4">
            {giftCards.map((gift) => (
              <GiftCard
                key={gift.id}
                id={gift.id}
                name={gift.name}
                description={gift.description}
                code={gift.code}
                expiryDate={gift.expiryDate}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoyaltyPage;
