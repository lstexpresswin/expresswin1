import React from "react";
import { Button } from "../ui/button";
import { ShoppingCart, Plus, Minus, Trash } from "lucide-react";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customizations?: string[];
}

interface CartDrawerProps {
  cartItems?: CartItem[];
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  onCheckout?: () => void;
}

const CartDrawer = ({
  cartItems = [],
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
  onCheckout = () => {},
}: CartDrawerProps) => {
  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartItems.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
              {cartItems.length}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent dir="rtl">
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>سلة المشتريات</DrawerTitle>
            <DrawerDescription>
              {cartItems.length > 0
                ? `${cartItems.length} عناصر في السلة`
                : "سلة المشتريات فارغة"}
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.price} د.م.‏ × {item.quantity}
                      </p>
                      {item.customizations &&
                        item.customizations.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.customizations.map((customization, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs bg-gray-50"
                              >
                                {customization}
                              </Badge>
                            ))}
                          </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() =>
                          onUpdateQuantity(item.id, item.quantity + 1)
                        }
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-red-500"
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <Trash className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Separator />

                <div className="flex justify-between font-bold">
                  <span>الإجمالي:</span>
                  <span>{calculateTotal()} د.م.‏</span>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500">سلة المشتريات فارغة</p>
              </div>
            )}
          </div>
          <DrawerFooter>
            <Button
              onClick={onCheckout}
              disabled={cartItems.length === 0}
              className="w-full"
            >
              إتمام الطلب
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">إغلاق</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
