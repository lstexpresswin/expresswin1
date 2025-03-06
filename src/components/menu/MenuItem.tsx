import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Coins } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import MenuItemDetail from "./MenuItemDetail";

interface MenuItemProps {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  currency?: string;
  coinsReward?: number;
  onAddToCart?: (customizations?: any) => void;
  onCustomize?: () => void;
}

const MenuItem = ({
  id = "1",
  name = "طبق كسكس تقليدي",
  description = "كسكس مغربي تقليدي مع لحم الضأن والخضروات الموسمية",
  price = 85,
  image = "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
  currency = "د.م.‏",
  coinsReward = 10,
  onAddToCart = () => console.log("Add to cart clicked"),
  onCustomize = () => console.log("Customize clicked"),
}: MenuItemProps) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleAddToCartWithCustomizations = (customizations: any) => {
    console.log("Add to cart with customizations", customizations);
    onAddToCart(customizations);
    setIsDetailOpen(false);
  };

  return (
    <Card className="w-full max-w-[280px] overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow rtl">
      <div className="relative h-[140px] w-full overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        {coinsReward > 0 && (
          <div className="absolute top-2 right-2 bg-primary/80 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <Coins className="h-3 w-3" />
            <span>+{coinsReward}</span>
          </div>
        )}
      </div>
      <CardHeader className="pb-1 text-right">
        <CardTitle className="font-bold text-[12.25px]">{name}</CardTitle>
      </CardHeader>
      <CardContent className="text-right">
        <p className="text-xs text-gray-600 mb-1 line-clamp-2">{description}</p>
        <p className="text-md font-bold text-primary">
          {price} {currency}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center items-center pt-1 pb-3">
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogTrigger asChild>
            <Button onClick={onCustomize} className="w-full text-sm">
              إضافة للسلة
            </Button>
          </DialogTrigger>
          <DialogContent className="p-0 max-w-md">
            <MenuItemDetail
              id={id}
              name={name}
              description={description}
              price={price}
              image={image}
              currency={currency}
              onClose={() => setIsDetailOpen(false)}
              onAddToCart={handleAddToCartWithCustomizations}
            />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default MenuItem;
