import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Utensils, Lock, Phone, LogIn, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AppLogin = () => {
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("0612345678"); // Pre-filled for demo
  const [pin, setPin] = useState("1234"); // Pre-filled for demo
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simple validation
    if (!phoneNumber || !pin) {
      setError("يرجى إدخال رقم الهاتف ورمز PIN");
      setLoading(false);
      return;
    }

    if (pin.length !== 4) {
      setError("يجب أن يتكون رمز PIN من 4 أرقام");
      setLoading(false);
      return;
    }

    // For demo purposes, accept any login
    setTimeout(() => {
      setLoading(false);
      // Set login flag and user data
      localStorage.setItem("userLoggedIn", "true");
      localStorage.setItem("userProfile", JSON.stringify({
        name: "محمد أحمد",
        phone: phoneNumber,
        address: "شارع الحسن الثاني، الدار البيضاء",
        pin: pin
      }));
      
      toast({
        title: "تم تسجيل الدخول بنجاح",
        description: "مرحباً بك في تطبيق الطلبات",
      });
      
      navigate("/home");
    }, 1000);
  };

  const handleRequestAccount = () => {
    if (!phoneNumber) {
      setError("يرجى إدخال رقم الهاتف أولاً");
      return;
    }

    const message = `مرحباً،\n\nأرغب في إنشاء حساب جديد في تطبيقكم.\n\nرقم الهاتف: ${phoneNumber}\n\nشكراً لكم.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${import.meta.env.VITE_APP_WHATSAPP_NUMBER || "+212600000000"}?text=${encodedMessage}`, "_blank");
  };

  const handleForgotPin = () => {
    if (!phoneNumber) {
      setError("يرجى إدخال رقم الهاتف أولاً");
      return;
    }

    const message = `مرحباً،\n\nلقد نسيت رمز PIN الخاص بي.\n\nرقم الهاتف: ${phoneNumber}\n\nأرجو مساعدتي في استعادة الوصول إلى حسابي.\n\nشكراً لكم.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${import.meta.env.VITE_APP_WHATSAPP_NUMBER || "+212600000000"}?text=${encodedMessage}`, "_blank");
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
            أدخل رقم الهاتف ورمز PIN للوصول إلى حسابك
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
              <Label htmlFor="phone">رقم الهاتف</Label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="أدخل رقم الهاتف"
                  className="pl-3 pr-10"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="pin">رمز PIN</Label>
                <Button
                  type="button"
                  variant="link"
                  className="text-xs text-primary h-auto p-0"
                  onClick={handleForgotPin}
                >
                  نسيت رمز PIN؟
                </Button>
              </div>
              <div className="relative">
                <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="pin"
                  type="password"
                  placeholder="أدخل رمز PIN المكون من 4 أرقام"
                  className="pl-3 pr-10"
                  maxLength={4}
                  value={pin}
                  onChange={(e) =>
                    setPin(e.target.value.replace(/[^0-9]/g, ""))
                  }
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <Button type="submit" className="w-full gap-2" disabled={loading}>
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <LogIn className="h-4 w-4" />
              )}
              تسجيل الدخول
            </Button>
            <div className="text-center">
              <span className="text-sm text-gray-500">ليس لديك حساب؟</span>
              <Button
                type="button"
                variant="link"
                className="