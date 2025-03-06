import React, { useState, useEffect } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  Gift,
  Coins,
  Menu as MenuIcon,
  Users,
  LogOut,
  Bell,
  ChevronRight,
  ChevronLeft,
  Search,
  Settings,
  Calendar,
  Utensils,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import AdminDashboardNew from "./AdminDashboardNew";
import OrderManagement from "./OrderManagement";
import LoyaltyCardManagement from "./LoyaltyCardManagementNew";
import QuickGiftManagement from "./QuickGiftManagement";
import CoinsManagement from "./CoinsManagement";
import MenuManagement from "./MenuManagement";
import UserManagement from "./UserManagement";
import StandaloneAdminLogin from "./StandaloneAdminLogin";

// This is a standalone version of the admin layout that doesn't rely on routing
const StandaloneAdminLayout = () => {
  // Check if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [timeRange, setTimeRange] = useState("today");
  const [content, setContent] = useState<React.ReactNode>(null);

  useEffect(() => {
    // Check login status
    const loginStatus = sessionStorage.getItem("adminLoggedIn") === "true";
    setIsLoggedIn(loginStatus);

    // Set initial content
    if (loginStatus) {
      updateContent("dashboard");
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("adminLoggedIn");
    setIsLoggedIn(false);
  };

  const updateContent = (section: string) => {
    setActiveSection(section);

    // Render the appropriate component based on the section
    switch (section) {
      case "dashboard":
        setContent(<AdminDashboardNew />);
        break;
      case "orders":
        setContent(<OrderManagement />);
        break;
      case "loyalty-cards":
        setContent(<LoyaltyCardManagement />);
        break;
      case "quick-gifts":
        setContent(<QuickGiftManagement />);
        break;
      case "coins":
        setContent(<CoinsManagement />);
        break;
      case "menu":
        setContent(<MenuManagement />);
        break;
      case "users":
        setContent(<UserManagement />);
        break;
      default:
        setContent(<AdminDashboardNew />);
    }
  };

  // If not logged in, show login page
  if (!isLoggedIn) {
    return <StandaloneAdminLogin />;
  }

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
              onClick={() => updateContent("dashboard")}
              collapsed={!sidebarOpen}
            />
            <NavItem
              icon={<ShoppingBag className="h-5 w-5" />}
              label="إدارة الطلبات"
              isActive={activeSection === "orders"}
              onClick={() => updateContent("orders")}
              collapsed={!sidebarOpen}
              badge={5}
            />
            <NavItem
              icon={<CreditCard className="h-5 w-5" />}
              label="بطاقات الولاء"
              isActive={activeSection === "loyalty-cards"}
              onClick={() => updateContent("loyalty-cards")}
              collapsed={!sidebarOpen}
            />
            <NavItem
              icon={<Gift className="h-5 w-5" />}
              label="الهدايا السريعة"
              isActive={activeSection === "quick-gifts"}
              onClick={() => updateContent("quick-gifts")}
              collapsed={!sidebarOpen}
            />
            <NavItem
              icon={<Coins className="h-5 w-5" />}
              label="إدارة الكوينز"
              isActive={activeSection === "coins"}
              onClick={() => updateContent("coins")}
              collapsed={!sidebarOpen}
            />
            <NavItem
              icon={<MenuIcon className="h-5 w-5" />}
              label="إدارة القوائم"
              isActive={activeSection === "menu"}
              onClick={() => updateContent("menu")}
              collapsed={!sidebarOpen}
            />
            <NavItem
              icon={<Users className="h-5 w-5" />}
              label="إدارة المستخدمين"
              isActive={activeSection === "users"}
              onClick={() => updateContent("users")}
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
                  <DropdownMenuItem onClick={handleLogout}>
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
                    onClick={() => updateContent("orders")}
                  >
                    عرض جميع الإشعارات
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-16 p-6 overflow-auto pb-20 md:pb-6">{content}</main>
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

export default StandaloneAdminLayout;
