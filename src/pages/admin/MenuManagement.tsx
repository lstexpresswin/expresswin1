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
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Menu,
  Plus,
  Search,
  Edit,
  Trash,
  Image,
  Tag,
  Filter,
  MoreVertical,
  Copy,
  Eye,
  EyeOff,
  ArrowUpDown,
  Utensils,
  Coffee,
  Pizza,
  Beef,
  Salad,
  Sandwich,
  IceCream,
  Cake,
  Upload,
  Coins,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MenuManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isEditItemOpen, setIsEditItemOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [newItemData, setNewItemData] = useState({
    name: "",
    description: "",
    price: "",
    coinsPrice: "",
    category: "",
    sizes: [],
    ingredients: [],
    addons: [],
    image: "",
    isAvailable: true,
  });
  const [newCategoryData, setNewCategoryData] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [newSize, setNewSize] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [newAddon, setNewAddon] = useState({ name: "", price: "" });

  const handleAddItem = () => {
    console.log("Add item", newItemData);
    setIsAddItemOpen(false);
    setNewItemData({
      name: "",
      description: "",
      price: "",
      coinsPrice: "",
      category: "",
      sizes: [],
      ingredients: [],
      addons: [],
      image: "",
      isAvailable: true,
    });
  };

  const handleEditItem = () => {
    console.log("Edit item", selectedItem);
    setIsEditItemOpen(false);
  };

  const handleAddCategory = () => {
    console.log("Add category", newCategoryData);
    setIsAddCategoryOpen(false);
    setNewCategoryData({
      name: "",
      description: "",
      image: "",
    });
  };

  const handleToggleItemAvailability = (item: any) => {
    console.log("Toggle availability", item);
    // Here you would update the item availability in the database
  };

  const handleDuplicateItem = (item: any) => {
    console.log("Duplicate item", item);
    // Here you would duplicate the item in the database
  };

  const handleDeleteItem = (item: any) => {
    if (window.confirm(`هل أنت متأكد من حذف ${item.name}؟`)) {
      console.log("Delete item", item);
      // Here you would delete the item from the database
    }
  };

  const handleAddSize = () => {
    if (newSize.trim() !== "") {
      setNewItemData({
        ...newItemData,
        sizes: [...newItemData.sizes, newSize.trim()],
      });
      setNewSize("");
    }
  };

  const handleRemoveSize = (index: number) => {
    const updatedSizes = [...newItemData.sizes];
    updatedSizes.splice(index, 1);
    setNewItemData({ ...newItemData, sizes: updatedSizes });
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim() !== "") {
      setNewItemData({
        ...newItemData,
        ingredients: [...newItemData.ingredients, newIngredient.trim()],
      });
      setNewIngredient("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = [...newItemData.ingredients];
    updatedIngredients.splice(index, 1);
    setNewItemData({ ...newItemData, ingredients: updatedIngredients });
  };

  const handleAddAddon = () => {
    if (newAddon.name.trim() !== "") {
      setNewItemData({
        ...newItemData,
        addons: [...newItemData.addons, { ...newAddon }],
      });
      setNewAddon({ name: "", price: "" });
    }
  };

  const handleRemoveAddon = (index: number) => {
    const updatedAddons = [...newItemData.addons];
    updatedAddons.splice(index, 1);
    setNewItemData({ ...newItemData, addons: updatedAddons });
  };

  // Filter menu items based on search, category, and tab
  const filteredItems = menuItems.filter((item) => {
    // Filter by search term
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by category
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;

    // Filter by tab
    if (activeTab === "all") return matchesSearch && matchesCategory;
    if (activeTab === "available")
      return matchesSearch && matchesCategory && item.isAvailable;
    if (activeTab === "unavailable")
      return matchesSearch && matchesCategory && !item.isAvailable;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">إدارة القوائم</h1>
          <p className="text-gray-500 mt-1">إدارة قائمة الطعام والفئات</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Tag className="h-4 w-4" />
                فئة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="rtl max-w-md">
              <DialogHeader>
                <DialogTitle>إضافة فئة جديدة</DialogTitle>
                <DialogDescription>أدخل تفاصيل الفئة الجديدة</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="category-name">اسم الفئة</Label>
                  <Input
                    id="category-name"
                    placeholder="مثال: الأطباق الرئيسية"
                    value={newCategoryData.name}
                    onChange={(e) =>
                      setNewCategoryData({
                        ...newCategoryData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category-description">وصف الفئة</Label>
                  <Textarea
                    id="category-description"
                    placeholder="وصف مختصر للفئة"
                    value={newCategoryData.description}
                    onChange={(e) =>
                      setNewCategoryData({
                        ...newCategoryData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category-image">صورة الفئة</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="category-image"
                      type="file"
                      className="flex-1"
                      accept="image/*"
                    />
                    <Button variant="outline" className="gap-1">
                      <Upload className="h-4 w-4" />
                      تحميل
                    </Button>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddCategoryOpen(false)}
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleAddCategory}
                  disabled={!newCategoryData.name}
                >
                  إضافة فئة
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                إضافة صنف جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="rtl max-w-3xl">
              <DialogHeader>
                <DialogTitle>إضافة صنف جديد</DialogTitle>
                <DialogDescription>أدخل تفاصيل الصنف الجديد</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
                <div className="space-y-2">
                  <Label htmlFor="item-name">اسم الصنف</Label>
                  <Input
                    id="item-name"
                    placeholder="مثال: طبق كسكس تقليدي"
                    value={newItemData.name}
                    onChange={(e) =>
                      setNewItemData({ ...newItemData, name: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>الأحجام المتاحة</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="مثال: صغير"
                      value={newSize}
                      onChange={(e) => setNewSize(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddSize}
                    >
                      إضافة
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newItemData.sizes.map((size, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="gap-1 px-3 py-1"
                      >
                        {size}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 text-gray-500 hover:text-red-500"
                          onClick={() => handleRemoveSize(index)}
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="item-price">السعر (د.م.‏)</Label>
                    <Input
                      id="item-price"
                      type="number"
                      placeholder="مثال: 85"
                      value={newItemData.price}
                      onChange={(e) =>
                        setNewItemData({
                          ...newItemData,
                          price: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="item-coins-price">
                      السعر بالكوينز (في حالة الشراء بالكوينز)
                    </Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="item-coins-price"
                        type="number"
                        placeholder="مثال: 500"
                        value={newItemData.coinsPrice}
                        onChange={(e) =>
                          setNewItemData({
                            ...newItemData,
                            coinsPrice: e.target.value,
                          })
                        }
                      />
                      <Coins className="h-5 w-5 text-yellow-500" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="item-category">الفئة</Label>
                  <Select
                    value={newItemData.category}
                    onValueChange={(value) =>
                      setNewItemData({ ...newItemData, category: value })
                    }
                  >
                    <SelectTrigger id="item-category">
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="item-description">وصف قصير</Label>
                  <Textarea
                    id="item-description"
                    placeholder="وصف مختصر للصنف"
                    value={newItemData.description}
                    onChange={(e) =>
                      setNewItemData({
                        ...newItemData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>المكونات</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="مثال: لحم الضأن"
                      value={newIngredient}
                      onChange={(e) => setNewIngredient(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddIngredient}
                    >
                      إضافة
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newItemData.ingredients.map((ingredient, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="gap-1 px-3 py-1"
                      >
                        {ingredient}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 text-gray-500 hover:text-red-500"
                          onClick={() => handleRemoveIngredient(index)}
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>الإضافات (مع سعر كل إضافة)</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="اسم الإضافة"
                      className="flex-1"
                      value={newAddon.name}
                      onChange={(e) =>
                        setNewAddon({ ...newAddon, name: e.target.value })
                      }
                    />
                    <Input
                      placeholder="السعر"
                      type="number"
                      className="w-24"
                      value={newAddon.price}
                      onChange={(e) =>
                        setNewAddon({ ...newAddon, price: e.target.value })
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleAddAddon}
                    >
                      إضافة
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newItemData.addons.map((addon, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="gap-1 px-3 py-1"
                      >
                        {addon.name}
                        {addon.price !== "0" && addon.price !== "" && (
                          <span className="text-primary">
                            ({addon.price} د.م.‏)
                          </span>
                        )}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 text-gray-500 hover:text-red-500"
                          onClick={() => handleRemoveAddon(index)}
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="item-image">تحميل صورة الصنف</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="item-image"
                      type="file"
                      className="flex-1"
                      accept="image/*"
                    />
                    <Button variant="outline" className="gap-1">
                      <Upload className="h-4 w-4" />
                      تحميل
                    </Button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id="item-available"
                    checked={newItemData.isAvailable}
                    onCheckedChange={(checked) =>
                      setNewItemData({
                        ...newItemData,
                        isAvailable: checked as boolean,
                      })
                    }
                  />
                  <Label htmlFor="item-available">متاح للطلب</Label>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddItemOpen(false)}
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleAddItem}
                  disabled={
                    !newItemData.name ||
                    !newItemData.price ||
                    !newItemData.category
                  }
                >
                  إضافة صنف
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Categories */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="البحث عن صنف..."
              className="pl-3 pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">الأحدث</SelectItem>
                <SelectItem value="oldest">الأقدم</SelectItem>
                <SelectItem value="name-asc">الاسم (أ-ي)</SelectItem>
                <SelectItem value="name-desc">الاسم (ي-أ)</SelectItem>
                <SelectItem value="price-asc">السعر (تصاعدي)</SelectItem>
                <SelectItem value="price-desc">السعر (تنازلي)</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              تصفية
            </Button>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-2 gap-2">
          <CategoryButton
            category="all"
            label="الكل"
            icon={<Utensils className="h-5 w-5" />}
            isActive={activeCategory === "all"}
            onClick={() => setActiveCategory("all")}
          />
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              category={category.id}
              label={category.name}
              icon={getCategoryIcon(category.icon)}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
            />
          ))}
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">جميع الأصناف</TabsTrigger>
          <TabsTrigger value="available">متاحة</TabsTrigger>
          <TabsTrigger value="unavailable">غير متاحة</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onEdit={() => {
                    setSelectedItem(item);
                    setIsEditItemOpen(true);
                  }}
                  onToggleAvailability={() =>
                    handleToggleItemAvailability(item)
                  }
                  onDuplicate={() => handleDuplicateItem(item)}
                  onDelete={() => handleDeleteItem(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Menu className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-500">
                لم يتم العثور على أصناف
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onEdit={() => {
                    setSelectedItem(item);
                    setIsEditItemOpen(true);
                  }}
                  onToggleAvailability={() =>
                    handleToggleItemAvailability(item)
                  }
                  onDuplicate={() => handleDuplicateItem(item)}
                  onDelete={() => handleDeleteItem(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Menu className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-500">
                لم يتم العثور على أصناف متاحة
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="unavailable" className="space-y-4">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onEdit={() => {
                    setSelectedItem(item);
                    setIsEditItemOpen(true);
                  }}
                  onToggleAvailability={() =>
                    handleToggleItemAvailability(item)
                  }
                  onDuplicate={() => handleDuplicateItem(item)}
                  onDelete={() => handleDeleteItem(item)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Menu className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-500">
                لم يتم العثور على أصناف غير متاحة
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Item Dialog */}
      <Dialog open={isEditItemOpen} onOpenChange={setIsEditItemOpen}>
        <DialogContent className="rtl max-w-3xl">
          <DialogHeader>
            <DialogTitle>تعديل الصنف</DialogTitle>
            <DialogDescription>
              تعديل تفاصيل الصنف {selectedItem?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4 py-4 max-h-[70vh] overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="edit-item-name">اسم الصنف</Label>
                <Input
                  id="edit-item-name"
                  value={selectedItem.name}
                  onChange={(e) =>
                    setSelectedItem({ ...selectedItem, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>الأحجام المتاحة</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.sizes &&
                    selectedItem.sizes.map((size: string, index: number) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="gap-1 px-3 py-1"
                      >
                        {size}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-4 w-4 p-0 text-gray-500 hover:text-red-500"
                        >
                          <Trash className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-item-price">السعر (د.م.‏)</Label>
                  <Input
                    id="edit-item-price"
                    type="number"
                    value={selectedItem.price}
                    onChange={(e) =>
                      setSelectedItem({
                        ...selectedItem,
                        price: parseFloat(e.target.value),
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-item-coins-price">
                    السعر بالكوينز (في حالة الشراء بالكوينز)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="edit-item-coins-price"
                      type="number"
                      value={selectedItem.coinsPrice || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          coinsPrice: e.target.value,
                        })
                      }
                    />
                    <Coins className="h-5 w-5 text-yellow-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-item-category">الفئة</Label>
                <Select
                  value={selectedItem.category}
                  onValueChange={(value) =>
                    setSelectedItem({ ...selectedItem, category: value })
                  }
                >
                  <SelectTrigger id="edit-item-category">
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-item-description">وصف قصير</Label>
                <Textarea
                  id="edit-item-description"
                  value={selectedItem.description}
                  onChange={(e) =>
                    setSelectedItem({
                      ...selectedItem,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>المكونات</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.ingredients &&
                    selectedItem.ingredients.map(
                      (ingredient: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="gap-1 px-3 py-1"
                        >
                          {ingredient}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 text-gray-500 hover:text-red-500"
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ),
                    )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>الإضافات</Label>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.addons &&
                    selectedItem.addons.map(
                      (
                        addon: { name: string; price: string },
                        index: number,
                      ) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="gap-1 px-3 py-1"
                        >
                          {addon.name}
                          {addon.price !== "0" && addon.price !== "" && (
                            <span className="text-primary">
                              ({addon.price} د.م.‏)
                            </span>
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="h-4 w-4 p-0 text-gray-500 hover:text-red-500"
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ),
                    )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-item-image">صورة الصنف</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="edit-item-image"
                    type="file"
                    className="flex-1"
                    accept="image/*"
                  />
                  <Button variant="outline" className="gap-1">
                    <Upload className="h-4 w-4" />
                    تحميل
                  </Button>
                </div>
                {selectedItem.image && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-1">
                      الصورة الحالية:
                    </p>
                    <div className="h-32 w-full overflow-hidden rounded-md">
                      <img
                        src={selectedItem.image}
                        alt={selectedItem.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Checkbox
                  id="edit-item-available"
                  checked={selectedItem.isAvailable}
                  onCheckedChange={(checked) =>
                    setSelectedItem({
                      ...selectedItem,
                      isAvailable: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="edit-item-available">متاح للطلب</Label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditItemOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleEditItem}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface MenuItemCardProps {
  item: any;
  onEdit: () => void;
  onToggleAvailability: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

const MenuItemCard = ({
  item,
  onEdit,
  onToggleAvailability,
  onDuplicate,
  onDelete,
}: MenuItemCardProps) => {
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-32 w-full overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-sm">{item.name}</CardTitle>
            <CardDescription className="line-clamp-1 text-xs">
              {item.description}
            </CardDescription>
          </div>
          <Badge className={item.isAvailable ? "bg-green-500" : "bg-gray-500"}>
            {item.isAvailable ? "متاح" : "غير متاح"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="mt-1 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">
              التصنيف: {getCategoryName(item.category)}
            </span>
            <div className="flex items-center gap-1">
              <span className="font-bold">{item.price} د.م.‏</span>
              {item.coinsPrice && (
                <div className="flex items-center text-xs text-yellow-600">
                  <span>({item.coinsPrice}</span>
                  <Coins className="h-3 w-3 mx-0.5" />
                  <span>)</span>
                </div>
              )}
            </div>
          </div>

          {item.sizes && item.sizes.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.sizes.map((size: string, index: number) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {size}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2 flex justify-end gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="rtl">
            <DropdownMenuItem onClick={onEdit}>
              <Edit className="ml-2 h-4 w-4" />
              تعديل
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onDuplicate}>
              <Copy className="ml-2 h-4 w-4" />
              نسخ
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onToggleAvailability}>
              {item.isAvailable ? (
                <>
                  <EyeOff className="ml-2 h-4 w-4" />
                  إخفاء
                </>
              ) : (
                <>
                  <Eye className="ml-2 h-4 w-4" />
                  إظهار
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onDelete}
              className="text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <Trash className="ml-2 h-4 w-4" />
              حذف
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" size="sm" className="gap-1" onClick={onEdit}>
          <Edit className="h-4 w-4" />
          تعديل
        </Button>
      </CardFooter>
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

const getCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case "utensils":
      return <Utensils className="h-5 w-5" />;
    case "coffee":
      return <Coffee className="h-5 w-5" />;
    case "pizza":
      return <Pizza className="h-5 w-5" />;
    case "beef":
      return <Beef className="h-5 w-5" />;
    case "salad":
      return <Salad className="h-5 w-5" />;
    case "sandwich":
      return <Sandwich className="h-5 w-5" />;
    case "ice-cream":
      return <IceCream className="h-5 w-5" />;
    case "cake":
      return <Cake className="h-5 w-5" />;
    default:
      return <Utensils className="h-5 w-5" />;
  }
};

// Sample data
const categories = [
  { id: "appetizers", name: "المقبلات", icon: "salad" },
  { id: "main-dishes", name: "الأطباق الرئيسية", icon: "utensils" },
  { id: "sandwiches", name: "السندويشات", icon: "sandwich" },
  { id: "pizza", name: "البيتزا", icon: "pizza" },
  { id: "meat", name: "اللحوم", icon: "beef" },
  { id: "desserts", name: "الحلويات", icon: "cake" },
  { id: "ice-cream", name: "المثلجات", icon: "ice-cream" },
  { id: "beverages", name: "المشروبات", icon: "coffee" },
];

const menuItems = [
  {
    id: "1",
    name: "طبق كسكس تقليدي",
    description: "كسكس مغربي تقليدي مع لحم الضأن والخضروات الموسمية",
    price: 85,
    coinsPrice: 850,
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
    category: "main-dishes",
    isAvailable: true,
    sizes: ["صغير", "وسط", "كبير"],
    ingredients: ["لحم الضأن", "الجزر", "البصل", "الكوسة", "الحمص"],
    addons: [
      { name: "لحم إضافي", price: "25" },
      { name: "خضروات إضافية", price: "10" },
    ],
  },
  {
    id: "2",
    name: "طاجين لحم",
    description: "طاجين مغربي تقليدي مع لحم البقر والخضروات",
    price: 95,
    coinsPrice: 950,
    image:
      "https://images.unsplash.com/photo-1541518763669-27fef9a48765?w=600&q=80",
    category: "main-dishes",
    isAvailable: true,
    sizes: ["وسط", "كبير"],
    ingredients: ["لحم البقر", "البصل", "الطماطم", "الزيتون"],
    addons: [
      { name: "لحم إضافي", price: "30" },
      { name: "صلصة إضافية", price: "5" },
    ],
  },
  {
    id: "3",
    name: "سلطة مغربية",
    description: "سلطة طازجة مع الطماطم والخيار والبصل والزيتون",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80",
    category: "appetizers",
    isAvailable: true,
    sizes: ["صغير", "كبير"],
    ingredients: ["طماطم", "خيار", "بصل", "زيتون", "زيت زيتون"],
    addons: [
      { name: "جبنة فيتا", price: "10" },
      { name: "أفوكادو", price: "15" },
    ],
  },
  {
    id: "4",
    name: "بسطيلة",
    description: "فطيرة مغربية محشوة بالدجاج واللوز",
    price: 70,
    coinsPrice: 700,
    image:
      "https://images.unsplash.com/photo-1541518763669-27fef9a48765?w=600&q=80",
    category: "appetizers",
    isAvailable: false,
    sizes: ["فردي", "عائلي"],
    ingredients: ["دجاج", "لوز", "بيض", "بهارات", "سكر", "قرفة"],
    addons: [
      { name: "لوز إضافي", price: "15" },
      { name: "عسل", price: "5" },
    ],
  },
  {
    id: "5",
    name: "حلوى مغربية",
    description: "تشكيلة من الحلويات المغربية التقليدية",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1579372786545-d24232f7e0d1?w=600&q=80",
    category: "desserts",
    isAvailable: true,
    sizes: ["صغير", "وسط", "كبير"],
    ingredients: ["لوز", "عسل", "سكر", "قرفة", "ماء زهر"],
    addons: [
      { name: "عسل إضافي", price: "5" },
      { name: "مكسرات إضافية", price: "10" },
    ],
  },
  {
    id: "6",
    name: "شاي بالنعناع",
    description: "شاي أخضر مغربي تقليدي مع النعناع الطازج",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&q=80",
    category: "beverages",
    isAvailable: true,
    sizes: ["صغير", "وسط", "كبير"],
    ingredients: ["شاي أخضر", "نعناع طازج", "سكر"],
    addons: [
      { name: "نعناع إضافي", price: "0" },
      { name: "عسل", price: "5" },
    ],
  },
  {
    id: "7",
    name: "عصير برتقال طازج",
    description: "عصير برتقال طازج 100%",
    price: 20,
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=80",
    category: "beverages",
    isAvailable: true,
    sizes: ["صغير", "وسط", "كبير"],
    ingredients: ["برتقال طازج"],
    addons: [
      { name: "نعناع", price: "0" },
      { name: "ثلج", price: "0" },
    ],
  },
  {
    id: "8",
    name: "مشاوي مشكلة",
    description: "تشكيلة من اللحوم المشوية مع الخضروات",
    price: 120,
    coinsPrice: 1200,
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    category: "meat",
    isAvailable: false,
    sizes: ["فردي", "عائلي"],
    ingredients: ["لحم ضأن", "لحم بقر", "دجاج", "خضروات مشوية", "أرز"],
    addons: [
      { name: "صلصة حارة", price: "5" },
      { name: "خبز", price: "3" },
    ],
  },
];

export default MenuManagement;
