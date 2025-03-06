import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Check, CreditCard, Gift, MessageSquare } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  currency: string;
  customizations?: string[];
}

interface OrderConfirmationProps {
  items?: OrderItem[];
  loyaltyCard?: string;
  giftCode?: string;
  onConfirm?: (customerInfo: {
    name: string;
    phone: string;
    address: string;
    notes: string;
  }) => void;
  onWhatsAppConfirm?: (customerInfo: {
    name: string;
    phone: string;
    address: string;
    notes: string;
  }) => void;
}

const OrderConfirmation = ({
  items = [
    {
      id: "1",
      name: "طبق كسكس تقليدي",
      quantity: 2,
      price: 85,
      currency: "د.م.‏",
      customizations: ["بدون البصل"],
    },
    {
      id: "4",
      name: "شاي بالنعناع",
      quantity: 2,
      price: 15,
      currency: "د.م.‏",
    },
  ],
  loyaltyCard = "1234567",
  giftCode = "12345",
  onConfirm = (info) => console.log("Confirm order", info),
  onWhatsAppConfirm = (info) => console.log("WhatsApp confirm", info),
}: OrderConfirmationProps) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onConfirm(customerInfo);
    setIsSubmitted(true);
  };

  const handleWhatsAppConfirm = () => {
    onWhatsAppConfirm(customerInfo);
  };

  // Calculate total
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Apply discount if gift code is present (just for demo)
  const discount = giftCode ? 15 : 0;
  const total = subtotal - discount;

  return (
    <Card className="w-full max-w-2xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow rtl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">تأكيد الطلب</CardTitle>
        <CardDescription>راجع طلبك وأكمل المعلومات المطلوبة</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Order Summary */}
        <div>
          <h3 className="font-bold mb-2">ملخص الطلب</h3>
          <div className="space-y-2">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-start py-2 border-b"
              >
                <div>
                  <p className="font-medium">
                    {item.quantity}x {item.name}
                  </p>
                  {item.customizations && item.customizations.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.customizations.map((customization, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gray-100 px-1 py-0.5 rounded"
                        >
                          {customization}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <p className="font-medium">
                  {item.price * item.quantity} {item.currency}
                </p>
              </div>
            ))}
          </div>

          {/* Loyalty and Gifts */}
          <div className="mt-4 space-y-2">
            {loyaltyCard && (
              <div className="flex justify-between items-center bg-primary/5 p-2 rounded">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-primary" />
                  <span className="text-sm">بطاقة الولاء: {loyaltyCard}</span>
                </div>
              </div>
            )}

            {giftCode && (
              <div className="flex justify-between items-center bg-primary/5 p-2 rounded">
                <div className="flex items-center gap-2">
                  <Gift className="h-4 w-4 text-primary" />
                  <span className="text-sm">هدية سريعة: {giftCode}</span>
                </div>
                <span className="text-sm font-medium text-green-600">
                  -15 {items[0]?.currency}
                </span>
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="mt-4 space-y-1">
            <div className="flex justify-between">
              <span>المجموع الفرعي:</span>
              <span>
                {subtotal} {items[0]?.currency}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>الخصم:</span>
                <span>
                  -{discount} {items[0]?.currency}
                </span>
              </div>
            )}
            <Separator className="my-2" />
            <div className="flex justify-between font-bold">
              <span>الإجمالي:</span>
              <span>
                {total} {items[0]?.currency}
              </span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Customer Information */}
        {!isSubmitted ? (
          <div className="space-y-4">
            <h3 className="font-bold">معلومات العميل</h3>

            <div className="space-y-2">
              <Label htmlFor="name">الاسم</Label>
              <Input
                id="name"
                name="name"
                value={customerInfo.name}
                onChange={handleChange}
                placeholder="أدخل اسمك الكامل"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">رقم الهاتف</Label>
              <Input
                id="phone"
                name="phone"
                value={customerInfo.phone}
                onChange={handleChange}
                placeholder="أدخل رقم هاتفك"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">العنوان</Label>
              <Input
                id="address"
                name="address"
                value={customerInfo.address}
                onChange={handleChange}
                placeholder="أدخل عنوان التوصيل"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">ملاحظات إضافية</Label>
              <Textarea
                id="notes"
                name="notes"
                value={customerInfo.notes}
                onChange={handleChange}
                placeholder="أي ملاحظات إضافية للطلب"
                rows={3}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-2">تم تقديم الطلب بنجاح!</h3>
            <p className="text-center text-gray-600 mb-4">
              شكراً لطلبك. سنتواصل معك قريباً لتأكيد الطلب.
            </p>
            <Button
              onClick={handleWhatsAppConfirm}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
            >
              <MessageSquare className="h-4 w-4" />
              تأكيد عبر واتساب
            </Button>
          </div>
        )}
      </CardContent>

      {!isSubmitted && (
        <CardFooter>
          <Button
            onClick={handleSubmit}
            className="w-full bg-primary text-white py-6"
            disabled={
              !customerInfo.name || !customerInfo.phone || !customerInfo.address
            }
          >
            تأكيد الطلب
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default OrderConfirmation;
