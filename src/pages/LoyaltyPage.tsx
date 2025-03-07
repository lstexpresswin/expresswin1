import React from "react";
import MainLayout from "../components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Stamp, Coins, Gift, Clock } from "lucide-react";

const LoyaltyPage = () => {
  // Sample loyalty data
  const loyaltyData = {
    cards: [
      {
        id: "1234567",
        name: "بطاقة الوجبات الرئيسية",
        stamps: 5,
        maxStamps: 7,
        reward: "وجبة رئيسية مجانية",
      },
    ],
    coins: 120,
    gifts: [
      {
        id: "12345",
        name: "مشروب مجاني",
        description: "احصل على أي مشروب مجاني مع طلبك التالي",
        expiryDate: "2023-12-31",
        image:
          "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
      },
    ],
  };

  const rewards = [
    {
      id: "1",
      name: "خصم 10%",
      description: "خصم 10% على طلبك التالي",
      coinsRequired: 100,
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80",
    },
    {
      id: "2",
      name: "مشروب مجاني",
      description: "احصل على أي مشروب مجاني مع طلبك التالي",
      coinsRequired: 150,
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
    },
    {
      id: "3",
      name: "حلوى مجانية",
      description: "احصل على حلوى مجانية مع طلبك التالي",
      coinsRequired: 200,
      image:
        "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80",
    },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">برنامج الولاء</h1>

        <Tabs defaultValue="cards">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cards">بطاقات الولاء</TabsTrigger>
            <TabsTrigger value="rewards">المكافآت</TabsTrigger>
            <TabsTrigger value="gifts">الهدايا</TabsTrigger>
          </TabsList>

          {/* Loyalty Cards Tab */}
          <TabsContent value="cards" className="space-y-6 mt-6">
            {/* Coins Balance */}
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Coins className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-yellow-800">رصيد الكوينز</p>
                    <p className="text-2xl font-bold text-yellow-900">
                      {loyaltyData.coins}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loyalty Cards */}
            {loyaltyData.cards.map((card) => (
              <Card key={card.id}>
                <CardHeader>
                  <CardTitle>{card.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Stamp className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">الطوابع</p>
                        <p className="font-bold">
                          {card.stamps} / {card.maxStamps}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">المكافأة</p>
                      <p className="font-medium">{card.reward}</p>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{
                        width: `${(card.stamps / card.maxStamps) * 100}%`,
                      }}
                    ></div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm">
                      اجمع {card.maxStamps} طوابع للحصول على {card.reward}. يتم
                      الحصول على طابع واحد مع كل طلب بقيمة 50 د.م.‏ أو أكثر.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Gift Code Entry */}
            <Card>
              <CardHeader>
                <CardTitle>إدخال رمز هدية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input placeholder="أدخل رمز الهدية المكون من 5 أرقام" />
                  <Button>تحقق</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map((reward) => (
                <Card key={reward.id} className="overflow-hidden">
                  <div className="h-40 w-full overflow-hidden">
                    <img
                      src={reward.image}
                      alt={reward.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg">{reward.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {reward.description}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-1">
                        <Coins className="h-4 w-4 text-yellow-600" />
                        <span className="font-bold">
                          {reward.coinsRequired}
                        </span>
                      </div>
                      <Button
                        disabled={loyaltyData.coins < reward.coinsRequired}
                      >
                        استبدال
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gifts Tab */}
          <TabsContent value="gifts" className="space-y-6 mt-6">
            {loyaltyData.gifts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loyaltyData.gifts.map((gift) => (
                  <Card key={gift.id} className="overflow-hidden">
                    <div className="h-40 w-full overflow-hidden">
                      <img
                        src={gift.image}
                        alt={gift.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg">{gift.name}</h3>
                        <Badge className="bg-green-500">نشطة</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {gift.description}
                      </p>
                      <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>صالحة حتى: {gift.expiryDate}</span>
                      </div>
                      <Button className="w-full mt-4">استخدام</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <Gift className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-lg font-medium text-gray-500">
                  ليس لديك هدايا حالياً
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  أدخل رمز هدية أو استبدل مكافآتك للحصول على هدايا
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default LoyaltyPage;
