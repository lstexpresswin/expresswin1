import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash,
  Search,
  CreditCard,
  Wallet,
  Receipt,
  User,
  Phone,
  Send,
  Printer,
  Tag,
  Coffee,
  Pizza,
  Beef,
  Salad,
  Sandwich,
  IceCream,
  Utensils,
  Cake,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends MenuItem {
  quantity: number;
  customizations: string[];
}

const POSSystem = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [isCustomerDialogOpen, setIsCustomerDialogOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const addToCart = (item: MenuItem) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === item.id,
    );

    if (existingItemIndex !== -1) {
      // Item already exists in cart, increase quantity
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Add new item to cart
      setCart([...cart, { ...item, quantity: 1, customizations: [] }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item,
    );
    setCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    // First, check if we have customer info
    if (!customerInfo.name || !customerInfo.phone) {
      setIsCustomerDialogOpen(true);
      return;
    }

    // If we have customer info, proceed to payment
    setIsPaymentDialogOpen(true);
  };

  const handlePayment = () => {
    // Process payment and create order
    const order = {
      items: cart,
      total: calculateTotal(),
      customer: customerInfo,
      paymentMethod,
      date: new Date().toISOString(),
    };

    console.log("Order created:", order);

    // Clear cart and close dialog
    setCart([]);
    setIsPaymentDialogOpen(false);

    // Show success message
    alert("تم إنشاء الطلب بنجاح!");
  };

  const handleCustomerSubmit = () => {
    setIsCustomerDialogOpen(false);
    setIsPaymentDialogOpen(true);
  };

  const handleSendOrderViaWhatsApp = () => {
    if (!customerInfo.phone) return;

    const orderItems = cart
      .map(
        (item) =>
          `${item.quantity}x ${item.name} (${item.price} د.م.‏)${item.customizations.length > 0 ? ` - ${item.customizations.join(", ")}` : ""}`,
      )
      .join("\n");

    const message = `مرحباً ${customerInfo.name}،\n\nتم استلام طلبك بنجاح!\n\nتفاصيل الطلب:\n${orderItems}\n\nالإجمالي: ${calculateTotal()} د.م.‏\n\nشكراً لتعاملك معنا!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${customerInfo.phone}?text=${encodedMessage}`,
      "_blank",
    );
  };

  // Filter menu items based on search and category
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">نظام نقاط البيع</h1>
          <p className="text-gray-500 mt-1">إنشاء وإدارة الطلبات مباشرة</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Menu Section */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search and Categories */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="relative mb-4">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="البحث عن صنف..."
                className="pl-3 pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex overflow-x-auto pb-2 gap-2">
              <CategoryButton
                category="all"
                label="الكل"
                icon={<Utensils className="h-5 w-5" />}
                isActive={activeCategory === "all"}
                onClick={() => setActiveCategory("all")}
              />
              <CategoryButton
                category="main-dishes"
                label="الأطباق الرئيسية"
                icon={<Utensils className="h-5 w-5" />}
                isActive={activeCategory === "main-dishes"}
                onClick={() => setActiveCategory("main-dishes")}
              />
              <CategoryButton
                category="appetizers"
                label="المقبلات"
                icon={<Salad className="h-5 w-5" />}
                isActive={activeCategory === "appetizers"}
                onClick={() => setActiveCategory("appetizers")}
              />
              <CategoryButton
                category="sandwiches"
                label="السندويشات"
                icon={<Sandwich className="h-5 w-5" />}
                isActive={activeCategory === "sandwiches"}
                onClick={() => setActiveCategory("sandwiches")}
              />
              <CategoryButton
                category="pizza"
                label="البيتزا"
                icon={<Pizza className="h-5 w-5" />}
                isActive={activeCategory === "pizza"}
                onClick={() => setActiveCategory("pizza")}
              />
              <CategoryButton
                category="meat"
                label="اللحوم"
                icon={<Beef className="h-5 w-5" />}
                isActive={activeCategory === "meat"}
                onClick={() => setActiveCategory("meat")}
              />
              <CategoryButton
                category="desserts"
                label="الحلويات"
                icon={<Cake className="h-5 w-5" />}
                isActive={activeCategory === "desserts"}
                onClick={() => setActiveCategory("desserts")}
              />
              <CategoryButton
                category="beverages"
                label="المشروبات"
                icon={<Coffee className="h-5 w-5" />}
                isActive={activeCategory === "beverages"}
                onClick={() => setActiveCategory("beverages")}
              />
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} onAddToCart={addToCart} />
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">سلة المشتريات</CardTitle>
                <Badge className="bg-primary">{cart.length} عناصر</Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.price} د.م.‏ × {item.quantity}
                        </p>
                        {item.customizations.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.customizations.map((customization, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs bg-gray-50"
                              >
                                {customization}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex justify-between font-bold">
                    <span>الإجمالي:</span>
                    <span>{calculateTotal()} د.م.‏</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                  <p className="text-gray-500">سلة المشتريات فارغة</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="w-full gap-2"
                disabled={cart.length === 0}
                onClick={handleCheckout}
              >
                <ShoppingCart className="h-4 w-4" />
                إتمام الطلب
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">إجراءات سريعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                disabled={cart.length === 0}
                onClick={() => setCart([])}
              >
                <Trash className="h-4 w-4" />
                إفراغ السلة
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                disabled={cart.length === 0 || !customerInfo.phone}
                onClick={handleSendOrderViaWhatsApp}
              >
                <Send className="h-4 w-4" />
                إرسال عبر واتساب
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                disabled={cart.length === 0}
              >
                <Printer className="h-4 w-4" />
                طباعة الفاتورة
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Customer Info Dialog */}
      <Dialog
        open={isCustomerDialogOpen}
        onOpenChange={setIsCustomerDialogOpen}
      >
        <DialogContent className="rtl">
          <DialogHeader>
            <DialogTitle>معلومات العميل</DialogTitle>
            <DialogDescription>
              أدخل معلومات العميل لإتمام الطلب
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="customer-name">اسم العميل</Label>
              <Input
                id="customer-name"
                placeholder="أدخل اسم العميل"
                value={customerInfo.name}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, name: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-phone">رقم الهاتف</Label>
              <Input
                id="customer-phone"
                placeholder="أدخل رقم الهاتف"
                value={customerInfo.phone}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, phone: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-address">العنوان</Label>
              <Input
                id="customer-address"
                placeholder="أدخل العنوان"
                value={customerInfo.address}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, address: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customer-notes">ملاحظات إضافية</Label>
              <Input
                id="customer-notes"
                placeholder="أدخل أي ملاحظات إضافية"
                value={customerInfo.notes}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, notes: e.target.value })
                }
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCustomerDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              onClick={handleCustomerSubmit}
              disabled={!customerInfo.name || !customerInfo.phone}
            >
              متابعة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent className="rtl">
          <DialogHeader>
            <DialogTitle>الدفع</DialogTitle>
            <DialogDescription>اختر طريقة الدفع لإتمام الطلب</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>طريقة الدفع</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={paymentMethod === "cash" ? "default" : "outline"}
                  className="gap-2"
                  onClick={() => setPaymentMethod("cash")}
                >
                  <Wallet className="h-4 w-4" />
                  نقداً
                </Button>
                <Button
                  variant={paymentMethod === "card" ? "default" : "outline"}
                  className="gap-2"
                  onClick={() => setPaymentMethod("card")}
                >
                  <CreditCard className="h-4 w-4" />
                  بطاقة
                </Button>
                <Button
                  variant={paymentMethod === "other" ? "default" : "outline"}
                  className="gap-2"
                  onClick={() => setPaymentMethod("other")}
                >
                  <Tag className="h-4 w-4" />
                  أخرى
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span>إجمالي المشتريات:</span>
                <span>{calculateTotal()} د.م.‏</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>الضريبة (15%):</span>
                <span>{(calculateTotal() * 0.15).toFixed(2)} د.م.‏</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-bold">
                <span>الإجمالي النهائي:</span>
                <span>{(calculateTotal() * 1.15).toFixed(2)} د.م.‏</span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsPaymentDialogOpen(false)}
            >
              إلغاء
            </Button>
            <Button onClick={handlePayment}>تأكيد الطلب</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
}

const MenuItemCard = ({ item, onAddToCart }: MenuItemCardProps) => {
  return (
    <Card
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onAddToCart(item)}
    >
      <div className="h-32 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-3">
        <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
        <p className="text-xs text-gray-500 line-clamp-2 mt-1">
          {item.description}
        </p>
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-sm">{item.price} د.م.‏</span>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface CategoryButtonProps {
  category: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const CategoryButton = ({
  category,
  label,
  icon,
  isActive,
  onClick,
}: CategoryButtonProps) => {
  return (
    <Button
      variant={isActive ? "default" : "outline"}
      className="gap-2 whitespace-nowrap"
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
};

// Sample data
const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "طبق كسكس تقليدي",
    description: "كسكس مغربي تقليدي مع لحم الضأن والخضروات الموسمية",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
    category: "main-dishes",
  },
  {
    id: "2",
    name: "طاجين لحم",
    description: "طاجين مغربي تقليدي مع لحم البقر والخضروات",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1541518763669-27fef9a48765?w=600&q=80",
    category: "main-dishes",
  },
  {
    id: "3",
    name: "سلطة مغربية",
    description: "سلطة طازجة مع الطماطم والخيار والبصل والزيتون",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    category: "appetizers",
  },
  {
    id: "4",
    name: "بسطيلة",
    description: "فطيرة مغربية محشوة بالدجاج واللوز",
    price: 70,
    image:
      "https://images.unsplash.com/photo-1541518763669-27fef9a48765?w=600&q=80",
    category: "appetizers",
  },
  {
    id: "5",
    name: "حلوى مغربية",
    description: "تشكيلة من الحلويات المغربية التقليدية",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1579372786545-d24232f7e0d1?w=600&q=80",
    category: "desserts",
  },
  {
    id: "6",
    name: "شاي بالنعناع",
    description: "شاي أخضر مغربي تقليدي مع النعناع الطازج",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&q=80",
    category: "beverages",
  },
  {
    id: "7",
    name: "عصير برتقال طازج",
    description: "عصير برتقال طازج 100%",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80",
    category: "beverages",
  },
  {
    id: "8",
    name: "مشاوي مشكلة",
    description: "تشكيلة من اللحوم المشوية مع الخضروات",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    category: "meat",
  },
];

export default POSSystem;
