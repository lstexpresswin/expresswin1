import React, { useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Utensils, Lock, User, LogIn } from "lucide-react";

// This is a standalone version of the login page that doesn't rely on routing
const StandaloneAdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simple validation
    if (!username || !password) {
      setError("يرجى إدخال اسم المستخدم وكلمة المرور");
      setLoading(false);
      return;
    }

    // For demo purposes, accept any login
    setTimeout(() => {
      setLoading(false);
      // Set login flag
      sessionStorage.setItem("adminLoggedIn", "true");
      setLoggedIn(true);

      // Redirect to dashboard
      // Use direct DOM manipulation to avoid router issues
      const adminDashboardElement = document.createElement("div");
      adminDashboardElement.id = "admin-dashboard-container";
      document.body.innerHTML = "";
      document.body.appendChild(adminDashboardElement);

      // Render the dashboard directly
      const AdminDashboard = React.lazy(
        () => import("./StandaloneAdminLayout"),
      );
      const root = ReactDOM.createRoot(adminDashboardElement);
      root.render(
        <React.StrictMode>
          <AdminDashboard />
        </React.StrictMode>,
      );
    }, 1000);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-50 p-4"
      dir="rtl"
    >
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Utensils className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">تسجيل الدخول</CardTitle>
          <CardDescription>
            أدخل بيانات الدخول للوصول إلى لوحة التحكم
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="username">اسم المستخدم</Label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="username"
                  placeholder="أدخل اسم المستخدم"
                  className="pl-3 pr-10"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">كلمة المرور</Label>
                <Button
                  variant="link"
                  className="text-xs text-primary h-auto p-0"
                >
                  نسيت كلمة المرور؟
                </Button>
              </div>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="password"
                  type="password"
                  placeholder="أدخل كلمة المرور"
                  className="pl-3 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <LogIn className="h-4 w-4" />
              )}
              تسجيل الدخول
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default StandaloneAdminLogin;
