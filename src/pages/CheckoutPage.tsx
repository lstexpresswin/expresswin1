import React, { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Sample cart items
  const cartItems = [
    {
      id: "1",
      name: "طبق كسكس تقليدي",
      price: 85,
      quantity: 2,
      customizations: ["بدون البصل"],
    },
    {
      id: "6",
      name: "شاي بالنعناع",
      price: 15,
      quantity: 2,
      customizations: [],
    },
  ];

  const [deliveryAddress, setDeliveryAddress] = useState(
    "شارع الحسن الثاني، الدار البيضاء",
  );
  const [notes, setNotes] = useState("");
  const [useCoins, setUseCoins] = useState(false);

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const delivery = 15;
    return subtotal + delivery;
  };

  const handlePlaceOrder = () => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سيتم التواصل معك قريباً لتأكيد الطلب",
      });

      // Redirect to home page after successful order
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    }, 1500);
  };

  const handleWhatsAppOrder = () => {
    const orderItems = cartItems
      .map(
        (item) =>
          `${item.quantity}x ${item.name} (${item.price} د.م.‏)${item.customizations.length > 0 ? ` - ${item.customizations.join(", ")}` : ""}`,
      )
      .join("\n");

    const message = `مرحباً،\n\nأود تقديم طلب جديد:\n\n${orderItems}\n\nالإجمالي: ${calculateTotal()} د.م.‏\n\nالعنوان: ${deliveryAddress}\n${notes ? `ملاحظات: ${notes}\n` : ""}\nشكراً!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${import.meta.env.VITE_APP_WHATSAPP_NUMBER || "+212600000000"}?text=${encodedMessage}`,
      "_blank",
    );
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">إتمام الطلب</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Order Summary */}
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.price} د.م.‏ × {item.quantity}
                        </p>
                        {item.customizations.length > 0 && (
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
                      <div className="text-right">
                        <p className="font-bold">
                          {item.price * item.quantity} د.م.‏
                        </p>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>المجموع الفرعي:</span>
                      <span>{calculateSubtotal()} د.م.‏</span>
                    </div>
                    <div className="flex justify-between">
                      <span>رسوم التوصيل:</span>
                      <span>15 د.م.‏</span>
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>الإجمالي:</span>
                      <span>{calculateTotal()} د.م.‏</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>معلومات التوصيل</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">عنوان التوصيل</Label>
                    <Input
                      id="address"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">ملاحظات إضافية</Label>
                    <Textarea
                      id="notes"
                      placeholder="أي تعليمات خاصة للتوصيل أو الطلب"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment and Loyalty */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>الدفع والمكافآت</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id="use-coins"
                      checked={useCoins}
                      onCheckedChange={(checked) =>
                        setUseCoins(checked as boolean)
                      }
                    />
                    <Label htmlFor="use-coins">
                      استخدام الكوينز (120 متاح)
                    </Label>
                  </div>

                  <div className="p-3 bg-yellow-50 rounded-md text-sm">
                    <p className="font-medium text-yellow-800">
                      ستحصل على 5 طوابع و 20 كوينز مع هذا الطلب!
                    </p>
                  </div>

                  <div className="pt-4">
                    <p className="text-sm font-medium mb-2">طريقة الدفع:</p>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <input
                          type="radio"
                          id="cash"
                          name="payment"
                          defaultChecked
                        />
                        <Label htmlFor="cash">الدفع عند الاستلام</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Button
                className="w-full gap-2"
                size="lg"
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? "جاري إرسال الطلب..." : "تأكيد الطلب"}
              </Button>

              <Button
                variant="outline"
                className="w-full gap-2"
                size="lg"
                onClick={handleWhatsAppOrder}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
                </svg>
                طلب عبر واتساب
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
