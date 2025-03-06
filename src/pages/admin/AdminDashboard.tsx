import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  ArrowUpRight,
  ArrowDownRight,
  LineChart,
  PieChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">لوحة التحكم</h1>
        <p className="text-gray-500">مرحباً بك في لوحة تحكم المطعم</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="الطلبات اليوم"
          value="12"
          description="3 طلبات جديدة"
          icon={<ShoppingBag className="h-5 w-5" />}
          trend="+20%"
          trendUp={true}
          color="blue"
        />

        <StatsCard
          title="المستخدمين النشطين"
          value="156"
          description="5 مستخدمين جدد"
          icon={<Users className="h-5 w-5" />}
          trend="+5%"
          trendUp={true}
          color="green"
        />

        <StatsCard
          title="إجمالي المبيعات"
          value="4,250 د.م.‏"
          description="اليوم"
          icon={<TrendingUp className="h-5 w-5" />}
          trend="+25%"
          trendUp={true}
          color="purple"
        />

        <StatsCard
          title="متوسط وقت التحضير"
          value="18 دقيقة"
          description="-2 دقيقة عن الأمس"
          icon={<Clock className="h-5 w-5" />}
          trend="-10%"
          trendUp={true}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg">المبيعات</CardTitle>
                <CardDescription>تحليل المبيعات اليومية</CardDescription>
              </div>
              <Tabs defaultValue="week" className="w-[200px]">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="day">يوم</TabsTrigger>
                  <TabsTrigger value="week">أسبوع</TabsTrigger>
                  <TabsTrigger value="month">شهر</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <LineChart className="h-16 w-16 text-gray-300" />
              <span className="text-gray-400 mr-2">رسم بياني للمبيعات</span>
            </div>
          </CardContent>
        </Card>

        {/* Popular Categories */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">التصنيفات الشائعة</CardTitle>
            <CardDescription>أكثر التصنيفات مبيعاً</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <CategoryProgress
                name="الأطباق الرئيسية"
                value={65}
                sales="2,450 د.م.‏"
                color="bg-blue-500"
              />
              <CategoryProgress
                name="المشروبات"
                value={48}
                sales="1,200 د.م.‏"
                color="bg-green-500"
              />
              <CategoryProgress
                name="الحلويات"
                value={35}
                sales="850 د.م.‏"
                color="bg-purple-500"
              />
              <CategoryProgress
                name="المقبلات"
                value={28}
                sales="700 د.م.‏"
                color="bg-amber-500"
              />
              <CategoryProgress
                name="البيتزا"
                value={22}
                sales="550 د.م.‏"
                color="bg-red-500"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg">أحدث الطلبات</CardTitle>
                <CardDescription>آخر 5 طلبات تم استلامها</CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => navigate("/admin/orders")}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>عرض الكل</span>
              </Button>
            </div>
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
                      className={`px-2 py-1 text-xs rounded-full ${getStatusClass(
                        order.status,
                      )}`}
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
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-lg">الأصناف الشائعة</CardTitle>
                <CardDescription>
                  الأصناف الأكثر مبيعاً هذا الأسبوع
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <PieChart className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors"
                >
                  <div className="h-10 w-10 rounded-md overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{item.price} د.م.‏</p>
                    <p className="text-xs text-gray-500">{item.orders} طلب</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
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
  color: "blue" | "green" | "purple" | "amber" | "red";
}

const StatsCard = ({
  title,
  value,
  description,
  icon,
  trend,
  trendUp,
  color,
}: StatsCardProps) => {
  const getColorClass = () => {
    switch (color) {
      case "blue":
        return "bg-blue-50 text-blue-600";
      case "green":
        return "bg-green-50 text-green-600";
      case "purple":
        return "bg-purple-50 text-purple-600";
      case "amber":
        return "bg-amber-50 text-amber-600";
      case "red":
        return "bg-red-50 text-red-600";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div
          className={`h-9 w-9 rounded-full ${getColorClass()} flex items-center justify-center`}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-muted-foreground">{description}</p>
          <div className="flex items-center gap-1">
            {trendUp ? (
              <ArrowUpRight className="h-3 w-3 text-green-600" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-600" />
            )}
            <p
              className={`text-xs ${
                trendUp ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface CategoryProgressProps {
  name: string;
  value: number;
  sales: string;
  color: string;
}

const CategoryProgress = ({
  name,
  value,
  sales,
  color,
}: CategoryProgressProps) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-sm font-medium">{sales}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`${color} h-2 rounded-full`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
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

export default AdminDashboard;
