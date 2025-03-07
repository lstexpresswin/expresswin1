import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  onAddToCart?: () => void;
}

const MenuItem = ({
  id,
  name,
  description,
  price,
  image,
  onAddToCart = () => {},
}: MenuItemProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex h-full">
        <div className="w-1/3 h-full overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="w-2/3 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-medium text-lg">{name}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 mt-1">
              {description}
            </p>
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold">{price} د.م.‏</span>
            <Button size="sm" className="gap-1" onClick={onAddToCart}>
              <Plus className="h-4 w-4" />
              إضافة
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MenuItem;
