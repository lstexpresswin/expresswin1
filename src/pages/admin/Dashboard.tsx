import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShoppingBag,
  Users,
  CreditCard,
  Gift,
  TrendingUp,
  Clock,
} from "lucide-react";

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">لوحة التحكم</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="الطلبات اليوم"
          value="12"
          description="3 طلبات جديدة"
          icon={<ShoppingBag className="h-5 w-5" />}
          trend="+20%"
          trendUp={true}
        />

        <StatsCard
          title="المستخدمين النشطين"
          value="156"
          description="5 مستخدمين جدد"
          icon={<Users className="h-5 w-5" />}
          trend="+5%"
          trendUp={true}
        />

        <StatsCard
          title="بطاقات الولاء النشطة"
          value="78"
          description="12 بطاقة مكتملة"
          icon={<CreditCard className="h-5 w-5" />}
          trend="+15%"
          trendUp={true}
        />

        <StatsCard
          title="الهدايا السريعة"
          value="45"
          description="8 هدايا مستخدمة"
          icon={<Gift className="h-5 w-5" />}
          trend="-10%"
          trendUp={false}
        />

        <StatsCard
          title="إجمالي المبيعات"
          value="4,250 د.م.‏"
          description="اليوم"
          icon={<TrendingUp className="h-5 w-5" />}
          trend="+25%"
          trendUp={true}
        />

        <StatsCard
          title="متوسط وقت التحضير"
          value="18 دقيقة"
          description="-2 دقيقة عن الأمس"
          icon={<Clock className="h-5 w-5" />}
          trend="-10%"
          trendUp={true}
        />
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>أحدث الطلبات</CardTitle>
          <CardDescription>آخر 5 طلبات تم استلامها</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{order.total} د.م.‏</p>
                  <p className="text-sm text-gray-500">{order.time}</p>
                </div>
                <div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${getStatusClass(order.status)}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Items */}
      <Card>
        <CardHeader>
          <CardTitle>الأصناف الأكثر طلباً</CardTitle>
          <CardDescription>الأصناف الأكثر مبيعاً هذا الأسبوع</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {popularItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{item.price} د.م.‏</p>
                  <p className="text-sm text-gray-500">{item.orders} طلب</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
}

const StatsCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendUp,
}: StatsCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-muted-foreground">{description}</p>
          <p
            className={`text-xs ${trendUp ? "text-green-600" : "text-red-600"}`}
          >
            {trend}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const recentOrders = [
  {
    id: "#ORD12345",
    customer: "محمد أحمد",
    total: "185",
    time: "منذ 5 دقائق",
    status: "new",
  },
  {
    id: "#ORD12346",
    customer: "فاطمة علي",
    total: "120",
    time: "منذ 15 دقيقة",
    status: "preparing",
  },
  {
    id: "#ORD12347",
    customer: "أحمد محمود",
    total: "95",
    time: "منذ 30 دقيقة",
    status: "delivering",
  },
  {
    id: "#ORD12348",
    customer: "سارة حسن",
    total: "210",
    time: "منذ 45 دقيقة",
    status: "delivered",
  },
  {
    id: "#ORD12349",
    customer: "خالد عمر",
    total: "150",
    time: "منذ ساعة",
    status: "cancelled",
  },
];

const popularItems = [
  {
    id: "1",
    name: "طبق كسكس تقليدي",
    category: "الأطباق الرئيسية",
    price: "85",
    orders: 24,
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
  },
  {
    id: "2",
    name: "طاجين لحم",
    category: "الأطباق الرئيسية",
    price: "95",
    orders: 18,
    image:
      "https://images.unsplash.com/photo-1541518763669-27fef9a48765?w=600&q=80",
  },
  {
    id: "8",
    name: "مشاوي مشكلة",
    category: "اللحوم",
    price: "120",
    orders: 15,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
  },
  {
    id: "5",
    name: "حلوى مغربية",
    category: "الحلويات",
    price: "45",
    orders: 12,
    image:
      "https://images.unsplash.com/photo-1579372786545-d24232f7e0d1?w=600&q=80",
  },
];

const getStatusClass = (status: string) => {
  switch (status) {
    case "new":
      return "bg-blue-100 text-blue-800";
    case "preparing":
      return "bg-yellow-100 text-yellow-800";
    case "delivering":
      return "bg-orange-100 text-orange-800";
    case "delivered":
      return "bg-green-100 text-green-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
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

export default Dashboard;
