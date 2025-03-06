import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Check,
  Clock,
  Phone,
  User,
  MapPin,
  X,
  AlertTriangle,
  Send,
  Truck,
  Filter,
  Calendar,
  Plus,
  Download,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OrderManagement = () => {
  const [notificationSound] = useState(
    new Audio(
      "https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3",
    ),
  );
  const [showNotification, setShowNotification] = useState(false);

  const handleAddTestOrder = () => {
    // Play notification sound
    notificationSound.play();

    // Show notification
    setShowNotification(true);

    // Add a new test order to the newOrders array
    console.log("Adding test order");
  };

  // Keep notification visible and sound playing until order is accepted or rejected
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showNotification) {
      timer = setInterval(() => {
        notificationSound.play();
      }, 10000); // Play sound every 10 seconds if notification is still active
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [showNotification, notificationSound]);

  const [activeTab, setActiveTab] = useState("new");
  const [isCustomerInfoOpen, setIsCustomerInfoOpen] = useState(false);
  const [isDeliveryDialogOpen, setIsDeliveryDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [deliveryPhone, setDeliveryPhone] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterDate, setFilterDate] = useState("today");

  const handleViewCustomerInfo = (order: any) => {
    setSelectedOrder(order);
    setIsCustomerInfoOpen(true);
  };

  const handleDeliveryDialog = (order: any) => {
    setSelectedOrder(order);
    setIsDeliveryDialogOpen(true);
  };

  const handleSendToDelivery = () => {
    // Here you would send the delivery info to the delivery person via WhatsApp
    const message = `طلب جديد للتوصيل:\n\nرقم الطلب: ${selectedOrder.id}\nرقم الهاتف: ${selectedOrder.customer.phone}\nالعنوان: ${selectedOrder.customer.address}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${deliveryPhone}?text=${encodedMessage}`,
      "_blank",
    );
    setIsDeliveryDialogOpen(false);
    setDeliveryPhone("");
  };

  const handleNotifyCustomer = (order: any) => {
    // Here you would send a WhatsApp message to the customer
    const message = `مرحباً ${order.customer.name}،\n\nنود إعلامك أن طلبك رقم ${order.id} قد تم إعداده وهو الآن قيد التوصيل.\n\nشكراً لتعاملك معنا!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${order.customer.phone}?text=${encodedMessage}`,
      "_blank",
    );
  };

  const handleAcceptOrder = (orderId: string) => {
    console.log("Accept order", orderId);
    setShowNotification(false); // Hide notification when all orders are handled
    // Here you would update the order status in the database
    // and move it to the preparing orders list
  };

  const handleRejectOrder = (orderId: string) => {
    console.log("Reject order", orderId);
    setShowNotification(false); // Hide notification when all orders are handled
    // Here you would update the order status in the database
  };

  const handleFinishPreparing = (orderId: string) => {
    console.log("Finish preparing", orderId);
    // Here you would update the order status in the database
    // and move it to the delivering orders list
  };

  const handleMarkDelivered = (orderId: string) => {
    console.log("Mark as delivered", orderId);
    // Here you would update the order status in the database
    // and move it to the order history
  };

  const handleNotifyOrderOwner = (order: any) => {
    // Send WhatsApp message to order owner about order acceptance
    const message = `مرحباً ${order.customer.name}،\n\nنود إعلامك أن طلبك رقم ${order.id} قد تم قبوله وهو الآن قيد الإعداد.\n\nشكراً لتعاملك معنا!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${order.customer.phone}?text=${encodedMessage}`,
      "_blank",
    );
  };

  const handleDownloadOrderData = () => {
    // Create CSV data
    const headers =
      "رقم الطلب,العميل,الحالة,التاريخ,وقت الإعداد,وقت التوصيل,الإجمالي\n";
    const csvData = orderHistory
      .map((order) => {
        return `${order.id},${order.customer.name},${getStatusText(order.status)},${order.date},${order.preparingTime || 0},${order.deliveryTime || 0},${order.total}`;
      })
      .join("\n");

    const blob = new Blob([headers + csvData], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `orders-${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredHistoryOrders = orderHistory.filter((order) => {
    if (filterStatus !== "all" && order.status !== filterStatus) return false;
    // In a real app, you would filter by date as well
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة الطلبات</h1>
        <Button
          onClick={handleAddTestOrder}
          className="gap-2 bg-green-500 hover:bg-green-600"
        >
          <Plus className="h-4 w-4" />
          إضافة طلب للاختبار
        </Button>
      </div>

      {showNotification && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 animate-pulse">
          <strong className="font-bold">تنبيه! </strong>
          <span className="block sm:inline">
            هناك طلبات جديدة تنتظر المراجعة.
          </span>
        </div>
      )}

      <Tabs defaultValue="new" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="new" className="relative">
            الطلبات الجديدة
            {newOrders.length > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-red-500">
                {newOrders.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="preparing" className="relative">
            قيد الإعداد
            {preparingOrders.length > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-yellow-500">
                {preparingOrders.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="delivering" className="relative">
            جاري التوصيل
            {deliveringOrders.length > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-blue-500">
                {deliveringOrders.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="history">سجل الطلبات</TabsTrigger>
        </TabsList>

        {/* New Orders */}
        <TabsContent value="new" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {newOrders.length > 0 ? (
              newOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  type="new"
                  onViewCustomerInfo={() => handleViewCustomerInfo(order)}
                  onAccept={() => handleAcceptOrder(order.id)}
                  onReject={() => handleRejectOrder(order.id)}
                  onNotifyOrderOwner={() => handleNotifyOrderOwner(order)}
                />
              ))
            ) : (
              <EmptyState message="لا توجد طلبات جديدة" />
            )}
          </div>
        </TabsContent>

        {/* Preparing Orders */}
        <TabsContent value="preparing" className="space-y-4">
          <div className="flex flex-col gap-4">
            {preparingOrders.length > 0 ? (
              preparingOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  type="preparing"
                  onViewCustomerInfo={() => handleViewCustomerInfo(order)}
                  onFinishPreparing={() => handleFinishPreparing(order.id)}
                  onDelivery={() => handleDeliveryDialog(order)}
                />
              ))
            ) : (
              <EmptyState message="لا توجد طلبات قيد الإعداد" />
            )}
          </div>
        </TabsContent>

        {/* Delivering Orders */}
        <TabsContent value="delivering" className="space-y-4">
          <div className="flex flex-col gap-4">
            {deliveringOrders.length > 0 ? (
              deliveringOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  type="delivering"
                  onViewCustomerInfo={() => handleViewCustomerInfo(order)}
                  onNotifyCustomer={() => handleNotifyCustomer(order)}
                  onMarkDelivered={() => handleMarkDelivered(order.id)}
                />
              ))
            ) : (
              <EmptyState message="لا توجد طلبات قيد التوصيل" />
            )}
          </div>
        </TabsContent>

        {/* Order History */}
        <TabsContent value="history">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">الحالة</label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="جميع الحالات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="new">جديد</SelectItem>
                    <SelectItem value="preparing">قيد الإعداد</SelectItem>
                    <SelectItem value="delivering">جاري التوصيل</SelectItem>
                    <SelectItem value="delivered">تم التسليم</SelectItem>
                    <SelectItem value="cancelled">ملغي</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">
                  التاريخ
                </label>
                <Select value={filterDate} onValueChange={setFilterDate}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="اختر الفترة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">اليوم</SelectItem>
                    <SelectItem value="yesterday">الأمس</SelectItem>
                    <SelectItem value="week">هذا الأسبوع</SelectItem>
                    <SelectItem value="month">هذا الشهر</SelectItem>
                    <SelectItem value="all">جميع الفترات</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end gap-2">
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  تصفية
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={handleDownloadOrderData}
                >
                  <Download className="h-4 w-4" />
                  تحميل البيانات
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredHistoryOrders.length > 0 ? (
              filteredHistoryOrders.map((order) => (
                <HistoryOrderCard
                  key={order.id}
                  order={order}
                  onViewCustomerInfo={() => handleViewCustomerInfo(order)}
                />
              ))
            ) : (
              <EmptyState message="لا توجد طلبات في السجل" />
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Customer Info Dialog */}
      <Dialog open={isCustomerInfoOpen} onOpenChange={setIsCustomerInfoOpen}>
        <DialogContent className="rtl">
          <DialogHeader>
            <DialogTitle>معلومات العميل</DialogTitle>
            <DialogDescription>
              تفاصيل العميل للطلب {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">الاسم</p>
                  <p className="font-medium">{selectedOrder.customer.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">رقم الهاتف</p>
                  <p className="font-medium">{selectedOrder.customer.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">العنوان</p>
                  <p className="font-medium">
                    {selectedOrder.customer.address}
                  </p>
                </div>
              </div>

              {selectedOrder.customer.notes && (
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="text-sm font-medium mb-1">ملاحظات إضافية:</p>
                  <p className="text-sm">{selectedOrder.customer.notes}</p>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button
              onClick={() => {
                if (selectedOrder) {
                  const phone = selectedOrder.customer.phone;
                  window.open(`tel:${phone}`, "_blank");
                }
              }}
              className="gap-2"
            >
              <Phone className="h-4 w-4" />
              اتصال
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delivery Dialog */}
      <Dialog
        open={isDeliveryDialogOpen}
        onOpenChange={setIsDeliveryDialogOpen}
      >
        <DialogContent className="rtl">
          <DialogHeader>
            <DialogTitle>إرسال للتوصيل</DialogTitle>
            <DialogDescription>
              أدخل رقم هاتف عامل التوصيل لإرسال تفاصيل الطلب
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                رقم هاتف عامل التوصيل
              </label>
              <Input
                placeholder="أدخل رقم الهاتف"
                value={deliveryPhone}
                onChange={(e) => setDeliveryPhone(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeliveryDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleSendToDelivery}
              disabled={!deliveryPhone}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              إرسال
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface OrderCardProps {
  order: any;
  type: "new" | "preparing" | "delivering";
  onViewCustomerInfo: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  onFinishPreparing?: () => void;
  onDelivery?: () => void;
  onNotifyCustomer?: () => void;
  onMarkDelivered?: () => void;
  onNotifyOrderOwner?: () => void;
}

const OrderCard = ({
  order,
  type,
  onViewCustomerInfo,
  onAccept,
  onReject,
  onFinishPreparing,
  onDelivery,
  onNotifyCustomer,
  onMarkDelivered,
  onNotifyOrderOwner,
}: OrderCardProps) => {
  const getTimerClass = (minutes: number) => {
    if (minutes >= 5) return "text-red-500 bg-red-100";
    return "text-green-500 bg-green-100";
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{order.id}</CardTitle>
            <CardDescription>
              {order.customer.name} - {order.timestamp}
            </CardDescription>
          </div>
          <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full ${getTimerClass(order.preparingTime || 0)}`}
          >
            <Clock className="h-4 w-4" />
            <span>{order.preparingTime || 0} دقيقة</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="space-y-2">
          {order.items.map((item: any, index: number) => (
            <div key={index} className="flex justify-between">
              <div>
                <p>
                  {item.quantity}x {item.name}
                </p>
                {item.customizations && item.customizations.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.customizations.map(
                      (customization: string, idx: number) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-xs bg-gray-50"
                        >
                          {customization}
                        </Badge>
                      ),
                    )}
                  </div>
                )}
              </div>
              <p className="font-medium">
                {item.price * item.quantity} {order.currency}
              </p>
            </div>
          ))}
        </div>

        <Separator className="my-3" />

        <div className="flex justify-between font-bold">
          <span>الإجمالي:</span>
          <span>
            {order.total} {order.currency}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onViewCustomerInfo}
          className="gap-1 w-full"
        >
          <User className="h-4 w-4" />
          معلومات العميل
        </Button>

        <div className="flex gap-2 w-full">
          {type === "new" && (
            <>
              <Button
                variant="destructive"
                size="sm"
                onClick={onReject}
                className="gap-1 flex-1"
              >
                <X className="h-4 w-4" />
                رفض
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onNotifyOrderOwner}
                className="gap-1 flex-1"
              >
                <Send className="h-4 w-4" />
                إبلاغ صاحب الطلب
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onAccept}
                className="gap-1 flex-1"
              >
                <Check className="h-4 w-4" />
                قبول
              </Button>
            </>
          )}

          {type === "preparing" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onDelivery}
                className="gap-1 flex-1"
              >
                <Truck className="h-4 w-4" />
                عامل التوصيل
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onFinishPreparing}
                className="gap-1 flex-1"
              >
                <Check className="h-4 w-4" />
                تم الإعداد
              </Button>
            </>
          )}

          {type === "delivering" && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={onNotifyCustomer}
                className="gap-1 flex-1"
              >
                <Send className="h-4 w-4" />
                إبلاغ العميل
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onMarkDelivered}
                className="gap-1 flex-1"
              >
                <Check className="h-4 w-4" />
                تم التسليم
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

interface HistoryOrderCardProps {
  order: any;
  onViewCustomerInfo: () => void;
}

const HistoryOrderCard = ({
  order,
  onViewCustomerInfo,
}: HistoryOrderCardProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500 hover:bg-blue-600">جديد</Badge>;
      case "preparing":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">
            قيد الإعداد
          </Badge>
        );
      case "delivering":
        return (
          <Badge className="bg-orange-500 hover:bg-orange-600">
            جاري التوصيل
          </Badge>
        );
      case "delivered":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">تم التسليم</Badge>
        );
      case "cancelled":
        return <Badge className="bg-red-500 hover:bg-red-600">ملغي</Badge>;
      default:
        return <Badge>غير معروف</Badge>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{order.id}</CardTitle>
            <CardDescription>
              {order.customer.name} - {order.date}
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-1">
            {getStatusBadge(order.status)}
            <span className="font-bold">
              {order.total} {order.currency}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="space-y-1">
          {order.items.map((item: any, index: number) => (
            <div key={index} className="flex justify-between text-sm">
              <span>
                {item.quantity}x {item.name}
                {item.customizations && item.customizations.length > 0
                  ? ` (${item.customizations.join(", ")})`
                  : ""}
              </span>
              <span>
                {item.price * item.quantity} {order.currency}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2 text-sm text-gray-500">
          <div>
            <p className="font-medium">وقت الإعداد:</p>
            <p>{order.preparingTime || 0} دقيقة</p>
          </div>
          <div>
            <p className="font-medium">وقت التوصيل:</p>
            <p>{order.deliveryTime || 0} دقيقة</p>
          </div>
          <div>
            <p className="font-medium">الوقت الإجمالي:</p>
            <p>
              {(order.preparingTime || 0) + (order.deliveryTime || 0)} دقيقة
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onViewCustomerInfo}
          className="gap-1 w-full"
        >
          <User className="h-4 w-4" />
          معلومات العميل
        </Button>
      </CardFooter>
    </Card>
  );
};

const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm col-span-full">
      <AlertTriangle className="h-12 w-12 text-gray-300 mb-4" />
      <p className="text-lg font-medium text-gray-500">{message}</p>
    </div>
  );
};

const getStatusText = (status: string) => {
  switch (status) {
    case "new":
      return "جديد";
    case "preparing":
      return "قيد الإعداد";
    case "delivering":
      return "جاري التوصيل";
    case "delivered":
      return "تم التسليم";
    case "cancelled":
      return "ملغي";
    default:
      return "غير معروف";
  }
};

// Sample data
const newOrders = [
  {
    id: "#ORD12345",
    customer: {
      name: "محمد أحمد",
      phone: "0612345678",
      address: "شارع الحسن الثاني، الدار البيضاء",
      notes: "الرجاء الاتصال قبل التوصيل",
    },
    items: [
      {
        name: "طبق كسكس تقليدي",
        quantity: 2,
        price: 85,
        customizations: ["بدون البصل"],
      },
      {
        name: "شاي بالنعناع",
        quantity: 2,
        price: 15,
      },
    ],
    total: 200,
    currency: "د.م.‏",
    timestamp: "منذ 5 دقائق",
    preparingTime: 3,
  },
  {
    id: "#ORD12346",
    customer: {
      name: "فاطمة علي",
      phone: "0612345679",
      address: "شارع محمد الخامس، الرباط",
      notes: "",
    },
    items: [
      {
        name: "طاجين لحم",
        quantity: 1,
        price: 95,
      },
      {
        name: "سلطة مغربية",
        quantity: 1,
        price: 35,
      },
    ],
    total: 130,
    currency: "د.م.‏",
    timestamp: "منذ 10 دقائق",
    preparingTime: 6,
  },
];

const preparingOrders = [
  {
    id: "#ORD12347",
    customer: {
      name: "أحمد محمود",
      phone: "0612345680",
      address: "شارع الزرقطوني، الدار البيضاء",
      notes: "الطابق الثالث، الشقة 8",
    },
    items: [
      {
        name: "بسطيلة",
        quantity: 1,
        price: 70,
      },
      {
        name: "حلوى مغربية",
        quantity: 1,
        price: 45,
      },
    ],
    total: 115,
    currency: "د.م.‏",
    timestamp: "منذ 15 دقيقة",
    preparingTime: 3,
  },
  {
    id: "#ORD12348",
    customer: {
      name: "سارة حسن",
      phone: "0612345681",
      address: "شارع عبد الكريم الخطابي، مراكش",
      notes: "",
    },
    items: [
      {
        name: "مشاوي مشكلة",
        quantity: 1,
        price: 120,
      },
      {
        name: "عصير برتقال طازج",
        quantity: 2,
        price: 20,
      },
    ],
    total: 160,
    currency: "د.م.‏",
    timestamp: "منذ 20 دقيقة",
    preparingTime: 6,
  },
];

const deliveringOrders = [
  {
    id: "#ORD12349",
    customer: {
      name: "خالد عمر",
      phone: "0612345682",
      address: "شارع محمد السادس، طنجة",
      notes: "",
    },
    items: [
      {
        name: "بيتزا مغربية",
        quantity: 2,
        price: 75,
      },
      {
        name: "كوكا كولا",
        quantity: 2,
        price: 10,
      },
    ],
    total: 170,
    currency: "د.م.‏",
    timestamp: "منذ 30 دقيقة",
    preparingTime: 8,
    deliveryTime: 15,
  },
];

const orderHistory = [
  {
    id: "#ORD12340",
    customer: {
      name: "محمد أحمد",
      phone: "0612345678",
      address: "شارع الحسن الثاني، الدار البيضاء",
      notes: "الرجاء الاتصال قبل التوصيل",
    },
    items: [
      {
        name: "طبق كسكس تقليدي",
        quantity: 2,
        price: 85,
        customizations: ["بدون البصل"],
      },
      {
        name: "شاي بالنعناع",
        quantity: 2,
        price: 15,
      },
    ],
    total: 200,
    currency: "د.م.‏",
    date: "2023-06-15",
    status: "delivered",
    preparingTime: 12,
    deliveryTime: 25,
  },
  {
    id: "#ORD12341",
    customer: {
      name: "فاطمة علي",
      phone: "0612345679",
      address: "شارع محمد الخامس، الرباط",
      notes: "",
    },
    items: [
      {
        name: "طاجين لحم",
        quantity: 1,
        price: 95,
      },
      {
        name: "سلطة مغربية",
        quantity: 1,
        price: 35,
      },
    ],
    total: 130,
    currency: "د.م.‏",
    date: "2023-06-14",
    status: "delivered",
    preparingTime: 15,
    deliveryTime: 20,
  },
  {
    id: "#ORD12342",
    customer: {
      name: "أحمد محمود",
      phone: "0612345680",
      address: "شارع الزرقطوني، الدار البيضاء",
      notes: "الطابق الثالث، الشقة 8",
    },
    items: [
      {
        name: "بسطيلة",
        quantity: 1,
        price: 70,
      },
      {
        name: "حلوى مغربية",
        quantity: 1,
        price: 45,
      },
    ],
    total: 115,
    currency: "د.م.‏",
    date: "2023-06-14",
    status: "cancelled",
    preparingTime: 5,
    deliveryTime: 0,
  },
  {
    id: "#ORD12343",
    customer: {
      name: "سارة حسن",
      phone: "0612345681",
      address: "شارع عبد الكريم الخطابي، مراكش",
      notes: "",
    },
    items: [
      {
        name: "مشاوي مشكلة",
        quantity: 1,
        price: 120,
      },
      {
        name: "عصير برتقال طازج",
        quantity: 2,
        price: 20,
      },
    ],
    total: 160,
    currency: "د.م.‏",
    date: "2023-06-13",
    status: "delivered",
    preparingTime: 10,
    deliveryTime: 30,
  },
  {
    id: "#ORD12344",
    customer: {
      name: "خالد عمر",
      phone: "0612345682",
      address: "شارع محمد السادس، طنجة",
      notes: "",
    },
    items: [
      {
        name: "بيتزا مغربية",
        quantity: 2,
        price: 75,
      },
      {
        name: "كوكا كولا",
        quantity: 2,
        price: 10,
      },
    ],
    total: 170,
    currency: "د.م.‏",
    date: "2023-06-13",
    status: "delivered",
    preparingTime: 8,
    deliveryTime: 22,
  },
];

export default OrderManagement;
