import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Trash2, Plus, Minus, CreditCard, Gift } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  currency: string;
  customizations?: string[];
}

interface CartDrawerProps {
  items?: CartItem[];
  onClose?: () => void;
  onCheckout?: (loyaltyCard?: string, giftCode?: string) => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
}

const CartDrawer = ({
  items = [
    {
      id: "1",
      name: "طبق كسكس تقليدي",
      description: "كسكس مغربي تقليدي",
      price: 85,
      image:
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
      quantity: 2,
      currency: "د.م.‏",
      customizations: ["بدون البصل"],
    },
    {
      id: "4",
      name: "شاي بالنعناع",
      description: "شاي أخضر مغربي",
      price: 15,
      image:
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&q=80",
      quantity: 1,
      currency: "د.م.‏",
    },
  ],
  onClose = () => console.log("Close cart"),
  onCheckout = () => console.log("Checkout"),
  onUpdateQuantity = (id, quantity) =>
    console.log(`Update quantity: ${id}, ${quantity}`),
  onRemoveItem = (id) => console.log(`Remove item: ${id}`),
}: CartDrawerProps) => {
  const [loyaltyCard, setLoyaltyCard] = useState("");
  const [giftCode, setGiftCode] = useState("");
  const [isLoyaltyDialogOpen, setIsLoyaltyDialogOpen] = useState(false);

  // Sample loyalty cards and gifts for the demo
  const loyaltyCards = [
    { id: "1234567", name: "بطاقة الوجبات الرئيسية", stamps: 5 },
    { id: "7654321", name: "بطاقة المشروبات", stamps: 3 },
    { id: "9876543", name: "بطاقة الحلويات", stamps: 2 },
  ];

  const giftCodes = [
    { id: "12345", name: "مشروب مجاني", expiry: "2023-12-31" },
    { id: "54321", name: "خصم 10%", expiry: "2023-11-30" },
    { id: "98765", name: "حلوى مجانية", expiry: "2023-12-15" },
  ];

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    onCheckout(loyaltyCard, giftCode);
  };

  return (
    <div className="h-full flex flex-col bg-white p-4 rtl">
      <h2 className="text-xl font-bold mb-4">سلة التسوق</h2>

      {items.length > 0 ? (
        <>
          <div className="flex-1 overflow-auto">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-3 border-b"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="mr-3">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.price} {item.currency} × {item.quantity}
                    </p>
                    {item.customizations && item.customizations.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.customizations.map((customization, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 px-1 py-0.5 rounded"
                          >
                            {customization}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      onClick={() =>
                        onUpdateQuantity(
                          item.id,
                          Math.max(1, item.quantity - 1),
                        )
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>

                    <span className="w-6 text-center">{item.quantity}</span>

                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t space-y-4">
            {/* Loyalty and Gift Section */}
            <div className="flex flex-col gap-2">
              {loyaltyCard && (
                <div className="flex justify-between items-center bg-primary/5 p-2 rounded">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <span className="text-sm">بطاقة الولاء: {loyaltyCard}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 p-0 text-destructive"
                    onClick={() => setLoyaltyCard("")}
                  >
                    إزالة
                  </Button>
                </div>
              )}

              {giftCode && (
                <div className="flex justify-between items-center bg-primary/5 p-2 rounded">
                  <div className="flex items-center gap-2">
                    <Gift className="h-4 w-4 text-primary" />
                    <span className="text-sm">هدية سريعة: {giftCode}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 p-0 text-destructive"
                    onClick={() => setGiftCode("")}
                  >
                    إزالة
                  </Button>
                </div>
              )}

              <Dialog
                open={isLoyaltyDialogOpen}
                onOpenChange={setIsLoyaltyDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-center mt-2"
                  >
                    إضافة بطاقة ولاء أو هدية
                  </Button>
                </DialogTrigger>
                <DialogContent className="rtl">
                  <DialogHeader>
                    <DialogTitle>إضافة بطاقة ولاء أو هدية</DialogTitle>
                    <DialogDescription>
                      اختر بطاقة ولاء أو أدخل رمز هدية لاستخدامها في طلبك
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="loyalty-card">بطاقة الولاء</Label>
                      <Select
                        onValueChange={(value) => setLoyaltyCard(value)}
                        value={loyaltyCard}
                      >
                        <SelectTrigger id="loyalty-card">
                          <SelectValue placeholder="اختر بطاقة الولاء" />
                        </SelectTrigger>
                        <SelectContent>
                          {loyaltyCards.map((card) => (
                            <SelectItem key={card.id} value={card.id}>
                              {card.name} - {card.stamps} طوابع
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="gift-code">رمز الهدية السريعة</Label>
                      <Select
                        onValueChange={(value) => setGiftCode(value)}
                        value={giftCode}
                      >
                        <SelectTrigger id="gift-code">
                          <SelectValue placeholder="اختر هدية سريعة" />
                        </SelectTrigger>
                        <SelectContent>
                          {giftCodes.map((gift) => (
                            <SelectItem key={gift.id} value={gift.id}>
                              {gift.name} - صالحة حتى{" "}
                              {new Date(gift.expiry).toLocaleDateString(
                                "ar-MA",
                              )}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        onClick={() => setIsLoyaltyDialogOpen(false)}
                        className="mt-2"
                      >
                        تأكيد
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Totals */}
            <div className="flex justify-between mb-2">
              <span>المجموع:</span>
              <span className="font-bold">
                {totalPrice} {items[0]?.currency || "د.م.‏"}
              </span>
            </div>

            <Button
              className="w-full bg-primary text-white py-3 rounded-md"
              onClick={handleCheckout}
            >
              إتمام الطلب
            </Button>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <p className="text-lg text-gray-500 mb-4">سلة التسوق فارغة</p>
          <Button variant="outline" onClick={onClose}>
            تصفح القائمة
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartDrawer;
