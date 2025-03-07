import React from "react";
import { Card, CardContent } from "../ui/card";
import { Stamp, Coins } from "lucide-react";

interface LoyaltyBannerProps {
  stamps?: number;
  coins?: number;
}

const LoyaltyBanner = ({ stamps = 0, coins = 0 }: LoyaltyBannerProps) => {
  return (
    <Card className="w-full bg-primary/5 border-primary/20">
      <CardContent className="p-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-1.5 rounded-full">
              <Stamp className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-gray-500">الطوابع</p>
              <p className="font-bold">{stamps} / 7</p>
            </div>
          </div>

          <div className="h-8 w-px bg-gray-200"></div>

          <div className="flex items-center gap-2">
            <div className="bg-yellow-100 p-1.5 rounded-full">
              <Coins className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">رصيد الكوينز</p>
              <p className="font-bold">{coins}</p>
            </div>
          </div>

          <div className="h-8 w-px bg-gray-200"></div>

          <div className="flex items-center gap-1">
            <span className="text-sm font-medium text-primary">
              عرض المكافآت
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoyaltyBanner;
