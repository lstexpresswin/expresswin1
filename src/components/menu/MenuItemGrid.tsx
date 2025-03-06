import React, { useState } from "react";
import MenuItem from "./MenuItem";
import { Button } from "../ui/button";
import { Search, Filter, ChevronRight, ChevronLeft, Star } from "lucide-react";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  currency: string;
  featured?: boolean;
}

interface MenuItemGridProps {
  items?: MenuItemType[];
  selectedCategory?: string;
  onAddToCart?: (item: MenuItemType, customizations?: any) => void;
  onCustomizeItem?: (item: MenuItemType) => void;
}

const MenuItemGrid = ({
  items = [
    {
      id: "1",
      name: "طبق كسكس تقليدي",
      description: "كسكس مغربي تقليدي مع لحم الضأن والخضروات الموسمية",
      price: 85,
      image:
        "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
      category: "main-dishes",
      currency: "د.م.‏",
      featured: true,
    },
    {
      id: "2",
      name: "طاجين لحم",
      description: "طاجين مغربي تقليدي مع لحم البقر والخضروات",
      price: 95,
      image:
        "https://images.unsplash.com/photo-1541518763669-27fef9a48765?w=600&q=80",
      category: "main-dishes",
      currency: "د.م.‏",
      featured: true,
    },
    {
      id: "3",
      name: "سلطة مغربية",
      description: "سلطة طازجة مع الطماطم والخيار والبصل والزيتون",
      price: 35,
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
      category: "appetizers",
      currency: "د.م.‏",
    },
    {
      id: "4",
      name: "شاي بالنعناع",
      description: "شاي أخضر مغربي تقليدي مع النعناع الطازج",
      price: 15,
      image:
        "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&q=80",
      category: "beverages",
      currency: "د.م.‏",
    },
    {
      id: "5",
      name: "حلوى مغربية",
      description: "تشكيلة من الحلويات المغربية التقليدية",
      price: 45,
      image:
        "https://images.unsplash.com/photo-1579372786545-d24232f7e0d1?w=600&q=80",
      category: "desserts",
      currency: "د.م.‏",
      featured: true,
    },
    {
      id: "6",
      name: "بسطيلة",
      description: "فطيرة مغربية محشوة بالدجاج واللوز والبيض",
      price: 70,
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
      category: "appetizers",
      currency: "د.م.‏",
    },
    {
      id: "7",
      name: "كفتة مشوية",
      description: "لحم مفروم متبل مشوي على الفحم مع صلصة طماطم",
      price: 65,
      image:
        "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=600&q=80",
      category: "meat",
      currency: "د.م.‏",
    },
    {
      id: "8",
      name: "مشاوي مشكلة",
      description: "تشكيلة من اللحوم المشوية مع الخضروات",
      price: 120,
      image:
        "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
      category: "meat",
      currency: "د.م.‏",
      featured: true,
    },
    {
      id: "9",
      name: "عصير برتقال طازج",
      description: "عصير برتقال طازج محضر يومياً",
      price: 20,
      image:
        "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=600&q=80",
      category: "beverages",
      currency: "د.م.‏",
    },
    {
      id: "10",
      name: "بيتزا مغربية",
      description: "بيتزا بنكهة مغربية مع التوابل المحلية",
      price: 75,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80",
      category: "pizza",
      currency: "د.م.‏",
    },
    {
      id: "11",
      name: "آيس كريم بالفواكه",
      description: "آيس كريم منزلي بنكهات الفواكه الموسمية",
      price: 30,
      image:
        "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&q=80",
      category: "ice-cream",
      currency: "د.م.‏",
    },
    {
      id: "12",
      name: "سندويش دجاج",
      description: "سندويش دجاج مشوي مع صلصة خاصة",
      price: 45,
      image:
        "https://images.unsplash.com/photo-1550507992-eb63ffee0847?w=600&q=80",
      category: "sandwiches",
      currency: "د.م.‏",
    },
  ],
  selectedCategory = "all",
  onAddToCart = (item, customizations) =>
    console.log("Add to cart", item, customizations),
  onCustomizeItem = (item) => console.log("Customize item", item),
}: MenuItemGridProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState(selectedCategory);
  const [cartItems, setCartItems] = useState<
    { id: string; quantity: number; customizations?: any }[]
  >([]);

  const itemsPerPage = 8;

  // Handle adding item to cart
  const handleAddToCart = (item: MenuItemType, customizations?: any) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      } else {
        return [...prev, { id: item.id, quantity: 1, customizations }];
      }
    });
    onAddToCart(item, customizations);
  };

  // Filter items based on search term and selected category
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeTab === "all" || item.category === activeTab;

    return matchesSearch && matchesCategory;
  });

  // Get featured items
  const featuredItems = items.filter((item) => item.featured);

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // Handle page navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full bg-gray-50 p-4 rtl" dir="rtl">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="ابحث عن وجبة..."
            className="pl-3 pr-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Featured Items Section */}
      {activeTab === "all" && featuredItems.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <Star className="h-5 w-5 text-yellow-500 mr-2" />
            <h2 className="text-lg font-bold">الوجبات المميزة</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {featuredItems.map((item) => (
              <MenuItem
                key={`featured-${item.id}`}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                currency={item.currency}
                onAddToCart={() => handleAddToCart(item)}
                onCustomize={() => onCustomizeItem(item)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <Tabs
        defaultValue={activeTab}
        className="mb-6"
        onValueChange={(value) => {
          setActiveTab(value);
          setCurrentPage(1);
        }}
        value={activeTab}
      >
        <TabsList className="mb-4 flex overflow-x-auto pb-2 hide-scrollbar">
          <TabsTrigger value="all">الكل</TabsTrigger>
          <TabsTrigger value="appetizers">المقبلات</TabsTrigger>
          <TabsTrigger value="main-dishes">الأطباق الرئيسية</TabsTrigger>
          <TabsTrigger value="sandwiches">السندويشات</TabsTrigger>
          <TabsTrigger value="pizza">البيتزا</TabsTrigger>
          <TabsTrigger value="meat">اللحوم</TabsTrigger>
          <TabsTrigger value="desserts">الحلويات</TabsTrigger>
          <TabsTrigger value="ice-cream">المثلجات</TabsTrigger>
          <TabsTrigger value="beverages">المشروبات</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          {/* Menu Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 justify-items-center">
            {paginatedItems.map((item) => (
              <MenuItem
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
                currency={item.currency}
                onAddToCart={() => handleAddToCart(item)}
                onCustomize={() => onCustomizeItem(item)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <span className="text-sm">
            {currentPage} من {totalPages}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-xl font-medium text-gray-600 mb-4">
            لا توجد عناصر متطابقة
          </p>
          <p className="text-gray-500">حاول تغيير معايير البحث الخاصة بك</p>
        </div>
      )}
    </div>
  );
};

export default MenuItemGrid;
