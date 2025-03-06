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
  Bell,
  Menu,
  Search,
  LayoutDashboard,
  ChevronDown,
  Settings,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Utensils,
  Coins,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AdminDashboardNew = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [timeRange, setTimeRange] = useState("today");

  const navigate = useNavigate();

  const handleNavigation = (section: string) => {
    setActiveSection(section);
    navigate(`/admin/${section}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      {/* Sidebar */}
      <aside
        className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? "w-64" : "w-20"} flex flex-col fixed h-full z-10`}
      >
        <div className="p-4 flex items-center justify-between border-b">
          <div className="flex items-center gap-2">
            {sidebarOpen && (
              <span className="text-xl font-bold text-primary">مطعمنا</span>
            )}
            <div className="bg-primary/10 p-2 rounded-md">
              <Utensils className="h-5 w-5 text-primary" />
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </Button>
        </div>

        <div className="flex-1 py-6 overflow-y-auto">
          <nav className="space-y-1 px-2">
            <NavItem
              icon={<LayoutDashboard className="h-5 w-5" />}
              label="لوحة التحكم"
              isActive={activeSection === "dashboard"}
              onClick={() => handleNavigation("dashboard")}
              collapsed={!sidebarOpen}
            />
            <NavItem
              icon={<ShoppingBag className="h-5 w-5" />}
              label="إدارة الطلبات"
              isActive={activeSection === "orders"}
              onClick={() => handleNavigation("orders")}
              collapsed={!sidebarOpen}
              badge={5}
            />
            <NavItem
              icon={<CreditCard className="h-5 w-5" />}
              label="بطاقات الولاء"
              isActive={activeSection === "loyalty-cards"}
              onClick={() => handleNavigation("loyalty-cards")}
              collapsed={!sidebarOpen}
            />
            <NavItem
              icon={<Gift className="h-5 w-5" />}
              label="الهدايا السريعة"
              isActive={activeSection === "quick-gifts"}
              onClick={() => handleNavigation("quick-gifts")}
              collapsed={!sidebarOpen}
            />
            <NavItem
              icon={<Coins className="h-5 w-5" />}
              label="إدارة الكوينز"
              isActive={activeSection === "coins"}
              onClick={() => handleNavigation("coins")}
              collapsed={!sidebarOpen}
            />
            <NavItem
              icon={<Menu className="h-5 w-5" />}
              label="إدارة القوائم"
              isActive={activeSection === "menu"}
              onClick={() => handleNavigation("menu")}
              collapsed={!sidebarOpen}
            />
            <NavItem
              icon={<Users className="h-5 w-5" />}
              label="إدارة المستخدمين"
              isActive={activeSection === "users"}
              onClick={() => handleNavigation("users")}
              collapsed={!sidebarOpen}
            />
          </nav>
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 bg-primary/10">
              <AvatarFallback className="text-primary font-bold">
                م
              </AvatarFallback>
            </Avatar>
            {sidebarOpen && (
              <div className="flex-1">
                <p className="font-medium text-sm">محمد المدير</p>
                <p className="text-xs text-gray-500">مدير النظام</p>
              </div>
            )}
            {sidebarOpen && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rtl">
                  <DropdownMenuItem>
                    <Settings className="ml-2 h-4 w-4" />
                    <span>الإعدادات</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      sessionStorage.removeItem("adminLoggedIn");
                      navigate("/admin/login");
                    }}
                  >
                    <LogOut className="ml-2 h-4 w-4" />
                    <span>تسجيل الخروج</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${sidebarOpen ? "mr-64" : "mr-20"}`}
      >
        {/* Header */}
        <header className="bg-white shadow-sm h-16 fixed left-0 right-0 z-10 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="البحث..."
                className="pl-3 pr-10 w-64 h-9 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40 h-9 text-sm">
                <SelectValue placeholder="اختر الفترة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">اليوم</SelectItem>
                <SelectItem value="yesterday">الأمس</SelectItem>
                <SelectItem value="week">هذا الأسبوع</SelectItem>
                <SelectItem value="month">هذا الشهر</SelectItem>
                <SelectItem value="year">هذا العام</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="gap-2 h-9">
              <Calendar className="h-4 w-4" />
              <span>15 يونيو - 15 يوليو</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 rtl">
                <div className="p-2 font-medium border-b">الإشعارات</div>
                <div className="py-2 px-3 text-sm hover:bg-gray-50 cursor-pointer">
                  <p className="font-medium">طلب جديد #12345</p>
                  <p className="text-gray-500">منذ 5 دقائق</p>
                </div>
                <div className="py-2 px-3 text-sm hover:bg-gray-50 cursor-pointer">
                  <p className="font-medium">طلب جديد #12346</p>
                  <p className="text-gray-500">منذ 10 دقائق</p>
                </div>
                <div className="py-2 px-3 text-sm hover:bg-gray-50 cursor-pointer">
                  <p className="font-medium">طلب جديد #12347</p>
                  <p className="text-gray-500">منذ 15 دقيقة</p>
                </div>
                <div className="p-2 text-center border-t">
                  <Button
                    variant="link"
                    className="text-primary text-sm h-auto p-0"
                    onClick={() => navigate("/admin/orders")}
                  >
                    عرض جميع الإشعارات
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="pt-16 p-6">
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
                        <p className="text-sm text-gray-500">
                          {order.customer}
                        </p>
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
                        <p className="font-medium text-sm">
                          {item.price} د.م.‏
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.orders} طلب
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  collapsed: boolean;
  badge?: number;
}

const NavItem = ({
  icon,
  label,
  isActive,
  onClick,
  collapsed,
  badge,
}: NavItemProps) => {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start py-2 px-3 relative ${isActive ? "bg-primary/10 text-primary hover:bg-primary/20" : "hover:bg-gray-100"}`}
      onClick={onClick}
    >
      <div
        className={`flex items-center gap-3 ${collapsed ? "justify-center w-full" : ""}`}
      >
        {icon}
        {!collapsed && <span>{label}</span>}
      </div>
      {badge && !collapsed && (
        <Badge className="absolute left-3 top-1/2 -translate-y-1/2 bg-red-500">
          {badge}
        </Badge>
      )}
      {badge && collapsed && (
        <Badge className="absolute -top-1 -right-1 bg-red-500 h-5 w-5 flex items-center justify-center p-0">
          {badge}
        </Badge>
      )}
    </Button>
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
              className={`text-xs ${trendUp ? "text-green-600" : "text-red-600"}`}
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

export default AdminDashboardNew;
