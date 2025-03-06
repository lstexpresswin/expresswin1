import React from "react";
import MainLayout from "../components/layout/MainLayout";
import OrderConfirmation from "../components/orders/OrderConfirmation";

const CheckoutPage = () => {
  // Sample order items
  const orderItems = [
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
  ];

  // Handle order confirmation
  const handleConfirmOrder = (customerInfo: any) => {
    console.log("Order confirmed", customerInfo);
  };

  // Handle WhatsApp confirmation
  const handleWhatsAppConfirm = (customerInfo: any) => {
    // Format the order details for WhatsApp
    const orderDetails = orderItems
      .map(
        (item) =>
          `${item.quantity}x ${item.name} ${item.customizations ? `(${item.customizations.join(", ")})` : ""}`,
      )
      .join("\n");

    const total = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // Create the WhatsApp message
    const message = `*طلب جديد*\n\n*العناصر:*\n${orderDetails}\n\n*المجموع:* ${total} د.م.‏\n\n*معلومات العميل:*\nالاسم: ${customerInfo.name}\nالهاتف: ${customerInfo.phone}\nالعنوان: ${customerInfo.address}\n${customerInfo.notes ? `ملاحظات: ${customerInfo.notes}` : ""}\n\n*بطاقة الولاء:* 1234567\n*هدية سريعة:* 12345`;

    // Encode the message for WhatsApp URL
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/+212600000000?text=${encodedMessage}`, "_blank");
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">إتمام الطلب</h1>

        <div className="flex justify-center">
          <OrderConfirmation
            items={orderItems}
            loyaltyCard="1234567"
            giftCode="12345"
            onConfirm={handleConfirmOrder}
            onWhatsAppConfirm={handleWhatsAppConfirm}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default CheckoutPage;
