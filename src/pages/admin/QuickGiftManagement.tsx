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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Gift,
  Plus,
  Copy,
  Calendar,
  Edit,
  Trash,
  Search,
  Ban,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data
const quickGifts = [
  {
    id: "12345",
    name: "مشروب مجاني",
    description: "احصل على أي مشروب مجاني مع طلبك التالي",
    type: "free-drink",
    expiryDate: "2023-12-31",
    status: "active",
    ownerName: "محمد أحمد",
    ownerPhone: "0612345678",
  },
  {
    id: "54321",
    name: "خصم 10%",
    description: "احصل على خصم 10% على طلبك التالي",
    type: "discount",
    expiryDate: "2023-11-30",
    status: "active",
    ownerName: "فاطمة علي",
    ownerPhone: "0612345679",
  },
  {
    id: "98765",
    name: "حلوى مجانية",
    description: "احصل على حلوى مجانية مع طلبك التالي",
    type: "free-dessert",
    expiryDate: "2023-12-15",
    status: "active",
    ownerName: null,
    ownerPhone: null,
  },
  {
    id: "13579",
    name: "وجبة مجانية",
    description: "احصل على وجبة رئيسية مجانية",
    type: "free-item",
    expiryDate: "2023-12-20",
    status: "inactive",
    ownerName: null,
    ownerPhone: null,
  },
];

const QuickGiftManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddGiftOpen, setIsAddGiftOpen] = useState(false);
  const [isEditGiftOpen, setIsEditGiftOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<any>(null);
  const [newGiftData, setNewGiftData] = useState({
    name: "",
    description: "",
    type: "",
    expiryDate: "",
    imageUrl: "",
  });

  const handleAddGift = () => {
    // Here you would add the gift to the database
    console.log("Add gift", newGiftData);
    setIsAddGiftOpen(false);
    setNewGiftData({
      name: "",
      description: "",
      type: "",
      expiryDate: "",
      imageUrl: "",
    });
  };

  const handleEditGift = () => {
    // Here you would update the gift in the database
    console.log("Edit gift", selectedGift);
    setIsEditGiftOpen(false);
  };

  const handleDuplicateGift = (gift: any) => {
    // Here you would duplicate the gift in the database
    console.log("Duplicate gift", gift);
  };

  const handleDeactivateGift = (gift: any) => {
    // Here you would deactivate the gift in the database
    console.log("Deactivate gift", gift);
  };

  const filteredGifts = quickGifts.filter(
    (gift) =>
      gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gift.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (gift.ownerName &&
        gift.ownerName.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة الهدايا السريعة</h1>
        <Dialog open={isAddGiftOpen} onOpenChange={setIsAddGiftOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              إضافة هدية جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="rtl">
            <DialogHeader>
              <DialogTitle>إضافة هدية سريعة جديدة</DialogTitle>
              <DialogDescription>
                أدخل تفاصيل الهدية السريعة الجديدة
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="gift-name">اسم الهدية</Label>
                <Input
                  id="gift-name"
                  placeholder="مثال: مشروب مجاني"
                  value={newGiftData.name}
                  onChange={(e) =>
                    setNewGiftData({ ...newGiftData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gift-description">وصف الهدية</Label>
                <Textarea
                  id="gift-description"
                  placeholder="مثال: احصل على أي مشروب مجاني مع طلبك التالي"
                  value={newGiftData.description}
                  onChange={(e) =>
                    setNewGiftData({
                      ...newGiftData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gift-id">رقم الهدية</Label>
                <div className="flex gap-2">
                  <Input
                    id="gift-id"
                    value={Math.floor(10000 + Math.random() * 90000).toString()}
                    readOnly
                    className="bg-gray-50"
                  />
                  <Button variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  رقم فريد مكون من 5 أرقام (يتم توليده تلقائياً)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gift-type">نوع الهدية</Label>
                <Select
                  value={newGiftData.type}
                  onValueChange={(value) =>
                    setNewGiftData({ ...newGiftData, type: value })
                  }
                >
                  <SelectTrigger id="gift-type">
                    <SelectValue placeholder="اختر نوع الهدية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">خصم</SelectItem>
                    <SelectItem value="free-item">وجبة مجانية</SelectItem>
                    <SelectItem value="free-drink">مشروب مجاني</SelectItem>
                    <SelectItem value="free-dessert">حلوى مجانية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expiry-date">تاريخ الصلاحية</Label>
                <Input
                  id="expiry-date"
                  type="date"
                  value={newGiftData.expiryDate}
                  onChange={(e) =>
                    setNewGiftData({
                      ...newGiftData,
                      expiryDate: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image-url">رابط الصورة (اختياري)</Label>
                <Input
                  id="image-url"
                  placeholder="أدخل رابط صورة الهدية"
                  value={newGiftData.imageUrl}
                  onChange={(e) =>
                    setNewGiftData({ ...newGiftData, imageUrl: e.target.value })
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddGiftOpen(false)}>
                إلغاء
              </Button>
              <Button
                onClick={handleAddGift}
                disabled={
                  !newGiftData.name ||
                  !newGiftData.description ||
                  !newGiftData.type ||
                  !newGiftData.expiryDate
                }
              >
                إنشاء هدية
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="البحث عن هدية سريعة..."
            className="pl-3 pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">جميع الهدايا</TabsTrigger>
          <TabsTrigger value="active">نشطة</TabsTrigger>
          <TabsTrigger value="inactive">غير نشطة</TabsTrigger>
          <TabsTrigger value="owned">مملوكة</TabsTrigger>
          <TabsTrigger value="unowned">غير مملوكة</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredGifts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGifts.map((gift) => (
                <QuickGiftCard
                  key={gift.id}
                  gift={gift}
                  onEdit={() => {
                    setSelectedGift(gift);
                    setIsEditGiftOpen(true);
                  }}
                  onDuplicate={() => handleDuplicateGift(gift)}
                  onDeactivate={() => handleDeactivateGift(gift)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Gift className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-500">
                لم يتم العثور على هدايا سريعة
              </p>
            </div>
          )}
        </TabsContent>

        {/* Other tabs would filter the gifts accordingly */}
        <TabsContent value="active" className="space-y-4">
          {/* Active gifts */}
        </TabsContent>
      </Tabs>

      {/* Edit Gift Dialog */}
      <Dialog open={isEditGiftOpen} onOpenChange={setIsEditGiftOpen}>
        <DialogContent className="rtl">
          <DialogHeader>
            <DialogTitle>تعديل الهدية السريعة</DialogTitle>
            <DialogDescription>
              تعديل تفاصيل الهدية {selectedGift?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedGift && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-gift-name">اسم الهدية</Label>
                <Input
                  id="edit-gift-name"
                  value={selectedGift.name}
                  onChange={(e) =>
                    setSelectedGift({ ...selectedGift, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-gift-description">وصف الهدية</Label>
                <Textarea
                  id="edit-gift-description"
                  value={selectedGift.description}
                  onChange={(e) =>
                    setSelectedGift({
                      ...selectedGift,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-gift-type">نوع الهدية</Label>
                <Select
                  value={selectedGift.type}
                  onValueChange={(value) =>
                    setSelectedGift({ ...selectedGift, type: value })
                  }
                >
                  <SelectTrigger id="edit-gift-type">
                    <SelectValue placeholder="اختر نوع الهدية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="discount">خصم</SelectItem>
                    <SelectItem value="free-item">وجبة مجانية</SelectItem>
                    <SelectItem value="free-drink">مشروب مجاني</SelectItem>
                    <SelectItem value="free-dessert">حلوى مجانية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-expiry-date">تاريخ الصلاحية</Label>
                <Input
                  id="edit-expiry-date"
                  type="date"
                  value={selectedGift.expiryDate}
                  onChange={(e) =>
                    setSelectedGift({
                      ...selectedGift,
                      expiryDate: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">الحالة</Label>
                <Select
                  value={selectedGift.status}
                  onValueChange={(value) =>
                    setSelectedGift({ ...selectedGift, status: value })
                  }
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">نشطة</SelectItem>
                    <SelectItem value="inactive">غير نشطة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditGiftOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleEditGift}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface QuickGiftCardProps {
  gift: any;
  onEdit: () => void;
  onDuplicate: () => void;
  onDeactivate: () => void;
}

const QuickGiftCard = ({
  gift,
  onEdit,
  onDuplicate,
  onDeactivate,
}: QuickGiftCardProps) => {
  const getStatusBadge = () => {
    if (gift.status === "active") {
      return <Badge className="bg-green-500">نشطة</Badge>;
    } else {
      return <Badge className="bg-gray-500">غير نشطة</Badge>;
    }
  };

  const getOwnershipBadge = () => {
    if (gift.ownerName) {
      return <Badge className="bg-blue-500">مملوكة</Badge>;
    } else {
      return <Badge className="bg-yellow-500">غير مملوكة</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("ar-MA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  const getGiftTypeText = (type: string) => {
    switch (type) {
      case "discount":
        return "خصم";
      case "free-item":
        return "وجبة مجانية";
      case "free-drink":
        return "مشروب مجاني";
      case "free-dessert":
        return "حلوى مجانية";
      default:
        return type;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{gift.name}</CardTitle>
            <CardDescription>رقم الهدية: {gift.id}</CardDescription>
          </div>
          <div className="flex flex-col gap-1">
            {getStatusBadge()}
            {getOwnershipBadge()}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="space-y-3">
          <p className="text-sm">{gift.description}</p>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              النوع: {getGiftTypeText(gift.type)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-500">
              صالحة حتى: {formatDate(gift.expiryDate)}
            </span>
          </div>

          {gift.ownerName && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium mb-1">المالك:</p>
              <p className="text-sm">{gift.ownerName}</p>
              <p className="text-xs text-gray-500">{gift.ownerPhone}</p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2 flex justify-between">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={onEdit}
          >
            <Edit className="h-4 w-4" />
            تعديل
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={onDuplicate}
          >
            <Copy className="h-4 w-4" />
            تكرار
          </Button>
        </div>

        {gift.status === "active" ? (
          <Button
            variant="outline"
            size="sm"
            className="gap-1 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={onDeactivate}
          >
            <Ban className="h-4 w-4" />
            حظر
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="gap-1 text-green-500 hover:text-green-700 hover:bg-green-50"
            onClick={onDeactivate}
          >
            <Check className="h-4 w-4" />
            تفعيل
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuickGiftManagement;
