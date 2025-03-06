import React, { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ShoppingCart, User, Globe, Menu, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { cn } from "../../lib/utils";

interface HeaderProps {
  logo?: string;
  cartItemCount?: number;
  onCartClick?: () => void;
  onProfileClick?: () => void;
  onLanguageToggle?: () => void;
  userName?: string;
  userAvatar?: string;
  isRTL?: boolean;
}

const Header = ({
  logo = "/vite.svg",
  cartItemCount = 3,
  onCartClick = () => console.log("Cart clicked"),
  onProfileClick = () => console.log("Profile clicked"),
  onLanguageToggle = () => console.log("Language toggled"),
  userName = "محمد",
  userAvatar = "",
  isRTL = true,
}: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={cn(
        "w-full h-20 bg-white shadow-sm fixed top-0 left-0 right-0 z-50",
        isRTL ? "rtl" : "ltr",
      )}
    >
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <img src={logo} alt="شعار التطبيق" className="h-10 w-auto" />
          <h1 className="text-xl font-bold text-primary mr-2 ml-2">مطعمنا</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLanguageToggle}
            className="flex items-center gap-2"
          >
            <Globe className="h-4 w-4" />
            <span>العربية</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onProfileClick}
            className="flex items-center gap-2"
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{userName}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onCartClick}
            className="relative flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>السلة</span>
            {cartItemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side={isRTL ? "right" : "left"}
              className={isRTL ? "rtl" : "ltr"}
            >
              <div className="flex flex-col gap-6 pt-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">القائمة</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    onProfileClick();
                    setMobileMenuOpen(false);
                  }}
                >
                  <User className="h-4 w-4 mr-2 ml-2" />
                  <span>الملف الشخصي</span>
                </Button>

                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    onCartClick();
                    setMobileMenuOpen(false);
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2 ml-2" />
                  <span>السلة</span>
                  {cartItemCount > 0 && (
                    <Badge variant="destructive" className="mr-2 ml-2">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>

                <Button
                  variant="ghost"
                  className="justify-start"
                  onClick={() => {
                    onLanguageToggle();
                    setMobileMenuOpen(false);
                  }}
                >
                  <Globe className="h-4 w-4 mr-2 ml-2" />
                  <span>تغيير اللغة</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
