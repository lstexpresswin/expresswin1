import React from "react";
import { Button } from "../ui/button";
import { Clock, ShoppingBag, RefreshCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  customizations?: string[];
}

interface Order {
  id: string;
  date: string;
  status: "new" | "preparing" | "delivering" | "delivered" | "cancelled";
  items: OrderItem[];
  total: number;
  currency: string;
}

interface OrderHistoryProps {
  orders?: Order[];
  onReorder?: (orderId: string) => void;
  onViewDetails?: (orderId: string) => void;
}

const OrderHistory = ({
  orders = [
    {
      id: "ORD12345",
      date: "2023-06-15T14:30:00",
      status: "delivered",
      items: [
        {
          id: "1",
          name: "طبق كسكس تقليدي",
          quantity: 2,
          price: 85,
          customizations: ["بدون البصل"],
        },
        {
          id: "4",
          name: "شاي بالنعناع",
          quantity: 2,
          price: 15,
        },
      ],
      total: 200,
      currency: "د.م.‏",
    },
    {
      id: "ORD12346",
      date: "2023-06-10T19:15:00",
      status: "delivered",
      items: [
        {
          id: "2",
          name: "طاجين لحم",
          quantity: 1,
          price: 95,
        },
        {
          id: "3",
          name: "سلطة مغربية",
          quantity: 1,
          price: 35,
        },
      ],
      total: 130,
      currency: "د.م.‏",
    },
    {
      id: "ORD12347",
      date: "2023-06-18T12:45:00",
      status: "preparing",
      items: [
        {
          id: "6",
          name: "بسطيلة",
          quantity: 1,
          price: 70,
        },
        {
          id: "5",
          name: "حلوى مغربية",
          quantity: 1,
          price: 45,
        },
      ],
      total: 115,
      currency: "د.م.‏",
    },
  ],
  onReorder = (orderId) => console.log(`Reorder: ${orderId}`),
  onViewDetails = (orderId) => console.log(`View details: ${orderId}`),
}: OrderHistoryProps) => {
  // Format date to Arabic format
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ar-MA", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  // Get status badge
  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "new":
        return (
          <Badge variant="default" className="bg-blue-500">
            جديد
          </Badge>
        );
      case "preparing":
        return (
          <Badge variant="default" className="bg-yellow-500">
            قيد الإعداد
          </Badge>
        );
      case "delivering":
        return (
          <Badge variant="default" className="bg-orange-500">
            جاري التوصيل
          </Badge>
        );
      case "delivered":
        return (
          <Badge variant="default" className="bg-green-500">
            تم التسليم
          </Badge>
        );
      case "cancelled":
        return (
          <Badge variant="default" className="bg-red-500">
            ملغي
          </Badge>
        );
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  return (
    <Card className="w-full overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow rtl">
      <CardHeader>
        <CardTitle className="text-xl font-bold">سجل الطلبات</CardTitle>
        <CardDescription>طلباتك السابقة</CardDescription>
      </CardHeader>

      <CardContent>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-bold">{order.id}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="h-4 w-4" />
                      <span>{formatDate(order.date)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(order.status)}
                    <span className="font-bold">
                      {order.total} {order.currency}
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <h4 className="text-sm font-medium mb-1">العناصر:</h4>
                  <ul className="text-sm text-gray-600">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>
                          {item.quantity}x {item.name}
                          {item.customizations && item.customizations.length > 0
                            ? ` (${item.customizations.join(", ")})`
                            : ""}
                        </span>
                        <span>
                          {item.price * item.quantity} {order.currency}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex gap-1"
                    onClick={() => onViewDetails(order.id)}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    التفاصيل
                  </Button>

                  <Button
                    variant="default"
                    size="sm"
                    className="flex gap-1"
                    onClick={() => onReorder(order.id)}
                  >
                    <RefreshCw className="h-4 w-4" />
                    إعادة الطلب
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 mb-2" />
            <p className="text-gray-500">لا توجد طلبات سابقة</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderHistory;
