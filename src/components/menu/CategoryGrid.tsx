import React from "react";
import { Button } from "../ui/button";
import {
  Utensils,
  Coffee,
  Pizza,
  Beef,
  Salad,
  Sandwich,
  IceCream,
  Cake,
} from "lucide-react";

interface CategoryGridProps {
  onSelectCategory?: (category: string) => void;
  selectedCategory?: string;
}

const CategoryGrid = ({
  onSelectCategory = () => {},
  selectedCategory = "all",
}: CategoryGridProps) => {
  const categories = [
    { id: "all", name: "الكل", icon: <Utensils className="h-5 w-5" /> },
    {
      id: "main-dishes",
      name: "الأطباق الرئيسية",
      icon: <Utensils className="h-5 w-5" />,
    },
    { id: "appetizers", name: "المقبلات", icon: <Salad className="h-5 w-5" /> },
    {
      id: "sandwiches",
      name: "السندويشات",
      icon: <Sandwich className="h-5 w-5" />,
    },
    { id: "pizza", name: "البيتزا", icon: <Pizza className="h-5 w-5" /> },
    { id: "meat", name: "اللحوم", icon: <Beef className="h-5 w-5" /> },
    { id: "desserts", name: "الحلويات", icon: <Cake className="h-5 w-5" /> },
    {
      id: "beverages",
      name: "المشروبات",
      icon: <Coffee className="h-5 w-5" />,
    },
    {
      id: "ice-cream",
      name: "المثلجات",
      icon: <IceCream className="h-5 w-5" />,
    },
  ];

  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex gap-2 min-w-max">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className="gap-2 whitespace-nowrap"
            onClick={() => onSelectCategory(category.id)}
          >
            {category.icon}
            <span>{category.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
