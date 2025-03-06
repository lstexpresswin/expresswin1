import React, { useState } from "react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Plus, Minus, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";

interface Ingredient {
  id: string;
  name: string;
  removable?: boolean;
}

interface Extra {
  id: string;
  name: string;
  price: number;
  currency: string;
}

interface MenuItemDetailProps {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  currency?: string;
  ingredients?: Ingredient[];
  extras?: Extra[];
  onClose?: () => void;
  onAddToCart?: (customizations: {
    removedIngredients: string[];
    addedExtras: string[];
  }) => void;
}

const MenuItemDetail = ({
  id = "1",
  name = "طبق كسكس تقليدي",
  description = "كسكس مغربي تقليدي مع لحم الضأن والخضروات الموسمية. يقدم مع صلصة مرق اللحم الغنية بالتوابل المغربية الأصيلة.",
  price = 85,
  image = "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
  currency = "د.م.‏",
  ingredients = [
    { id: "1", name: "لحم الضأن", removable: true },
    { id: "2", name: "الجزر", removable: true },
    { id: "3", name: "البصل", removable: true },
    { id: "4", name: "الكوسة", removable: true },
    { id: "5", name: "الحمص", removable: true },
    { id: "6", name: "توابل مغربية", removable: false },
  ],
  extras = [
    { id: "1", name: "لحم إضافي", price: 25, currency: "د.م.‏" },
    { id: "2", name: "خضروات إضافية", price: 15, currency: "د.م.‏" },
    { id: "3", name: "صلصة حارة", price: 5, currency: "د.م.‏" },
  ],
  onClose = () => console.log("Close detail"),
  onAddToCart = (customizations) =>
    console.log("Add to cart with customizations", customizations),
}: MenuItemDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [addedExtras, setAddedExtras] = useState<string[]>([]);

  const handleIngredientToggle = (ingredientId: string) => {
    setRemovedIngredients((prev) =>
      prev.includes(ingredientId)
        ? prev.filter((id) => id !== ingredientId)
        : [...prev, ingredientId],
    );
  };

  const handleExtraToggle = (extraId: string) => {
    setAddedExtras((prev) =>
      prev.includes(extraId)
        ? prev.filter((id) => id !== extraId)
        : [...prev, extraId],
    );
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    onAddToCart({
      removedIngredients,
      addedExtras,
    });
    onClose();
  };

  // Calculate total price including extras
  const extrasCost = extras
    .filter((extra) => addedExtras.includes(extra.id))
    .reduce((sum, extra) => sum + extra.price, 0);

  const totalPrice = (price + extrasCost) * quantity;

  return (
    <div className="bg-white rounded-lg overflow-hidden max-w-md w-full mx-auto rtl">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 left-2 bg-white/80 rounded-full h-8 w-8"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-1">{name}</h2>
        <p className="text-gray-600 text-sm mb-3">{description}</p>

        <div className="flex justify-between items-center mb-4">
          <div className="text-lg font-bold text-primary">
            {price} {currency}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleDecrement}
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="w-6 text-center">{quantity}</span>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={handleIncrement}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Separator className="my-4" />

        {/* Ingredients */}
        <div className="mb-4">
          <h3 className="font-bold mb-2">المكونات</h3>
          <div className="flex flex-wrap gap-2 mb-2">
            {ingredients.map((ingredient) => (
              <Badge
                key={ingredient.id}
                variant="outline"
                className={`${removedIngredients.includes(ingredient.id) ? "line-through opacity-50" : ""}`}
              >
                {ingredient.name}
              </Badge>
            ))}
          </div>

          <div className="space-y-2 mt-3">
            <p className="text-sm font-medium">إزالة مكونات:</p>
            {ingredients
              .filter((ingredient) => ingredient.removable)
              .map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="flex items-center space-x-2 space-x-reverse"
                >
                  <Checkbox
                    id={`remove-${ingredient.id}`}
                    checked={removedIngredients.includes(ingredient.id)}
                    onCheckedChange={() =>
                      handleIngredientToggle(ingredient.id)
                    }
                  />
                  <Label
                    htmlFor={`remove-${ingredient.id}`}
                    className="text-sm"
                  >
                    بدون {ingredient.name}
                  </Label>
                </div>
              ))}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Extras */}
        <div className="mb-4">
          <h3 className="font-bold mb-2">إضافات</h3>
          <div className="space-y-2">
            {extras.map((extra) => (
              <div key={extra.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={`extra-${extra.id}`}
                    checked={addedExtras.includes(extra.id)}
                    onCheckedChange={() => handleExtraToggle(extra.id)}
                  />
                  <Label htmlFor={`extra-${extra.id}`} className="text-sm">
                    {extra.name}
                  </Label>
                </div>
                <span className="text-sm">
                  +{extra.price} {extra.currency}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Separator className="my-4" />

        {/* Total and Add to Cart */}
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold">المجموع:</span>
          <span className="font-bold text-lg">
            {totalPrice} {currency}
          </span>
        </div>

        <Button
          className="w-full bg-primary text-white py-6"
          onClick={handleAddToCart}
        >
          إضافة للسلة
        </Button>
      </div>
    </div>
  );
};

export default MenuItemDetail;
