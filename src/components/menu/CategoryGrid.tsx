import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import {
  Coffee,
  Utensils,
  Pizza,
  Cake,
  Salad,
  Sandwich,
  IceCream,
  Beef,
  Sparkles,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

interface CategoryGridProps {
  categories?: Category[];
  selectedCategory?: string;
  onSelectCategory?: (id: string) => void;
}

const CategoryGrid = ({
  categories = [
    { id: "all", name: "الكل", icon: <Sparkles className="h-6 w-6" /> },
    { id: "appetizers", name: "المقبلات", icon: <Salad className="h-6 w-6" /> },
    {
      id: "main-dishes",
      name: "الأطباق الرئيسية",
      icon: <Utensils className="h-6 w-6" />,
    },
    {
      id: "sandwiches",
      name: "السندويشات",
      icon: <Sandwich className="h-6 w-6" />,
    },
    { id: "pizza", name: "البيتزا", icon: <Pizza className="h-6 w-6" /> },
    { id: "meat", name: "اللحوم", icon: <Beef className="h-6 w-6" /> },
    { id: "desserts", name: "الحلويات", icon: <Cake className="h-6 w-6" /> },
    {
      id: "ice-cream",
      name: "المثلجات",
      icon: <IceCream className="h-6 w-6" />,
    },
    {
      id: "beverages",
      name: "المشروبات",
      icon: <Coffee className="h-6 w-6" />,
    },
  ],
  selectedCategory = "all",
  onSelectCategory = (id) => console.log(`Category selected: ${id}`),
}: CategoryGridProps) => {
  return (
    <div className="w-full bg-white py-4 px-2 border-b">
      <div className="flex justify-center">
        <div className="grid grid-cols-5 gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category}
              isSelected={selectedCategory === category.id}
              onClick={() => onSelectCategory(category.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface CategoryButtonProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}

const CategoryButton = ({
  category,
  isSelected,
  onClick,
}: CategoryButtonProps) => {
  return (
    <Button
      variant="ghost"
      className={cn(
        "flex flex-col items-center justify-center h-20 w-20 rounded-full p-0 transition-all",
        isSelected
          ? "bg-primary/10 text-primary hover:bg-primary/20"
          : "hover:bg-secondary",
      )}
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <div
          className={`rounded-full p-2 ${isSelected ? "bg-primary/20" : "bg-secondary"}`}
        >
          {category.icon}
        </div>
        <span className="text-xs font-medium text-center">{category.name}</span>
      </div>
    </Button>
  );
};

export default CategoryGrid;
