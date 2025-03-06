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
import {
  Gift,
  Plus,
  Copy,
  Calendar,
  Edit,
  Trash,
  Search,
  Ban,
  Check,
  QrCode,
  Send,
  Download,
  Share2,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const GiftManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddGiftOpen, setIsAddGiftOpen] = useState(false);
  const [isEditGiftOpen, setIsEditGiftOpen] = useState(false);
  const [isShareGiftOpen, setIsShareGiftOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [newGiftData, setNewGiftData] = useState({
    name: "",
    description: "",
    type: "",
    expiryDate: "",
    imageUrl: "",
    value: "",
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
      value: "",
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
    // Show success message
    alert(
      `تم نسخ الهدية بنجاح. الرمز الجديد: ${Math.floor(10000 + Math.random() * 90000)}`,
    );
  };

  const handleDeactivateGift = (gift: any) => {
    // Here you would deactivate the gift in the database
    console.log("Deactivate gift", gift);
    // Show success message
    alert(
      `تم ${gift.status === "active" ? "إلغاء تنشيط" : "تنشيط"} الهدية بنجاح.`,
    );
  };

  const handleUseGift = (gift: any) => {
    // Here you would mark the gift as used in the database
    console.log("Use gift", gift);
    // Show success message
    alert("تم استخدام الهدية بنجاح.");
  };

  const handleShareGift = (gift: any) => {
    setSelectedGift(gift);
    setIsShareGiftOpen(true);
  };

  const handleSendGiftViaWhatsApp = (phone: string) => {
    if (selectedGift) {
      const message = `مرحباً،\n\nإليك هدية خاصة من مطعمنا: *${selectedGift.name}*\n\nرمز الهدية: *${selectedGift.id}*\n\nالوصف: ${selectedGift.description}\n\nتاريخ الانتهاء: ${formatDate(selectedGift.expiryDate)}\n\nيمكنك استخدام هذا الرمز في تطبيقنا أو عند زيارتك القادمة للمطعم.`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`https://wa.me/${phone}?text=${encodedMessage}`, "_blank");
      setIsShareGiftOpen(false);
    }
  };

  const filteredGifts = quickGifts.filter((gift) => {
    // Filter by search term
    const matchesSearch =
      gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gift.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (gift.ownerName &&
        gift.ownerName.toLowerCase().includes(searchTerm.toLowerCase()));

    // Filter by tab
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "active")
      return matchesSearch && gift.status === "active" && !gift.isUsed;
    if (activeTab === "used") return matchesSearch && gift.isUsed;
    if (activeTab === "inactive")
      return matchesSearch && gift.status === "inactive";
    if (activeTab === "owned") return matchesSearch && gift.ownerName;
    if (activeTab === "unowned") return matchesSearch && !gift.ownerName;

    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">إدارة الهدايا</h1>
          <p className="text-gray-500 mt-1">
            إنشاء وإدارة الهدايا السريعة للعملاء
          </p>
        </div>
        <Dialog open={isAddGiftOpen} onOpenChange={setIsAddGiftOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              إضافة هدية جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="rtl max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة هدية جديدة</DialogTitle>
              <DialogDescription>أدخل تفاصيل الهدية الجديدة</DialogDescription>
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gift-id">رمز الهدية</Label>
                  <div className="flex">
                    <Input
                      id="gift-id"
                      value={Math.floor(
                        10000 + Math.random() * 90000,
                      ).toString()}
                      readOnly
                      className="bg-gray-50 rounded-l-none"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-r-none"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gift-value">القيمة</Label>
                  <Input
                    id="gift-value"
                    type="number"
                    placeholder="مثال: 25"
                    value={newGiftData.value}
                    onChange={(e) =>
                      setNewGiftData({ ...newGiftData, value: e.target.value })
                    }
                  />
                </div>
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
                    <SelectItem value="custom">مخصص</SelectItem>
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
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="البحث عن هدية..."
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
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              تصفية
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">جميع الهدايا</TabsTrigger>
          <TabsTrigger value="active">نشطة</TabsTrigger>
          <TabsTrigger value="used">مستخدمة</TabsTrigger>
          <TabsTrigger value="inactive">غير نشطة</TabsTrigger>
          <TabsTrigger value="owned">مملوكة</TabsTrigger>
          <TabsTrigger value="unowned">غير مملوكة</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredGifts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGifts.map((gift) => (
                <GiftCard
                  key={gift.id}
                  gift={gift}
                  onEdit={() => {
                    setSelectedGift(gift);
                    setIsEditGiftOpen(true);
                  }}
                  onDuplicate={() => handleDuplicateGift(gift)}
                  onDeactivate={() => handleDeactivateGift(gift)}
                  onShare={() => handleShareGift(gift)}
                  onUse={() => handleUseGift(gift)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Gift className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-500">
                لم يتم العثور على هدايا
              </p>
            </div>
          )}
        </TabsContent>

        {/* Other tabs would filter the gifts accordingly */}
        <TabsContent value="active" className="space-y-4">
          {/* Active gifts - content is filtered in the filteredGifts variable */}
          {filteredGifts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGifts.map((gift) => (
                <GiftCard
                  key={gift.id}
                  gift={gift}
                  onEdit={() => {
                    setSelectedGift(gift);
                    setIsEditGiftOpen(true);
                  }}
                  onDuplicate={() => handleDuplicateGift(gift)}
                  onDeactivate={() => handleDeactivateGift(gift)}
                  onShare={() => handleShareGift(gift)}
                  onUse={() => handleUseGift(gift)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Gift className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-500">
                لم يتم العثور على هدايا نشطة
              </p>
            </div>
          )}
        </TabsContent>

        {/* Similar content for other tabs */}
        <TabsContent value="used" className="space-y-4">
          {/* Used gifts */}
          {filteredGifts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGifts.map((gift) => (
                <GiftCard
                  key={gift.id}
                  gift={gift}
                  onEdit={() => {
                    setSelectedGift(gift);
                    setIsEditGiftOpen(true);
                  }}
                  onDuplicate={() => handleDuplicateGift(gift)}
                  onDeactivate={() => handleDeactivateGift(gift)}
                  onShare={() => handleShareGift(gift)}
                  onUse={() => handleUseGift(gift)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Gift className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-500">
                لم يتم العثور على هدايا مستخدمة
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          {/* Inactive gifts */}
          {filteredGifts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGifts.map((gift) => (
                <GiftCard
                  key={gift.id}
                  gift={gift}
                  onEdit={() => {
                    setSelectedGift(gift);
                    setIsEditGiftOpen(true);
                  }}
                  onDuplicate={() => handleDuplicateGift(gift)}
                  onDeactivate={() => handleDeactivateGift(gift)}
                  onShare={() => handleShareGift(gift)}
                  onUse={() => handleUseGift(gift)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Gift className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-500">
                لم يتم العثور على هدايا غير نشطة
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="owned" className="space-y-4">
          {/* Owned gifts */}
          {filteredGifts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGifts.map((gift) => (
                <GiftCard
                  key={gift.id}
                  gift={gift}
                  onEdit={() => {
                    setSelectedGift(gift);
                    setIsEditGiftOpen(true);
                  }}
                  onDuplicate={() => handleDuplicateGift(gift)}
                  onDeactivate={() => handleDeactivateGift(gift)}
                  onShare={() => handleShareGift(gift)}
                  onUse={() => handleUseGift(gift)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Gift className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-500">
                لم يتم العثور على هدايا مملوكة
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="unowned" className="space-y-4">
          {/* Unowned gifts */}
          {filteredGifts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGifts.map((gift) => (
                <GiftCard
                  key={gift.id}
                  gift={gift}
                  onEdit={() => {
                    setSelectedGift(gift);
                    setIsEditGiftOpen(true);
                  }}
                  onDuplicate={() => handleDuplicateGift(gift)}
                  onDeactivate={() => handleDeactivateGift(gift)}
                  onShare={() => handleShareGift(gift)}
                  onUse={() => handleUseGift(gift)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Gift className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-500">
                لم يتم العثور على هدايا غير مملوكة
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Edit Gift Dialog */}
      <Dialog open={isEditGiftOpen} onOpenChange={setIsEditGiftOpen}>
        <DialogContent className="rtl max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل الهدية</DialogTitle>
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

              <div className="grid grid-cols-2 gap-4">
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
                      <SelectItem value="custom">مخصص</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-gift-status">الحالة</Label>
                  <Select
                    value={selectedGift.status}
                    onValueChange={(value) =>
                      setSelectedGift({ ...selectedGift, status: value })
                    }
                  >
                    <SelectTrigger id="edit-gift-status">
                      <SelectValue placeholder="اختر الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">نشطة</SelectItem>
                      <SelectItem value="inactive">غير نشطة</SelectItem>
                      <SelectItem value="used">مستخدمة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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

              {selectedGift.ownerName && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium mb-1">المالك:</p>
                  <p className="text-sm">{selectedGift.ownerName}</p>
                  <p className="text-xs text-gray-500">
                    {selectedGift.ownerPhone}
                  </p>
                </div>
              )}
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

      {/* Share Gift Dialog */}
      <Dialog open={isShareGiftOpen} onOpenChange={setIsShareGiftOpen}>
        <DialogContent className="rtl max-w-md">
          <DialogHeader>
            <DialogTitle>مشاركة الهدية</DialogTitle>
            <DialogDescription>
              مشاركة الهدية {selectedGift?.name} مع العملاء
            </DialogDescription>
          </DialogHeader>

          {selectedGift && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <div className="flex justify-center mb-2">
                  <QrCode className="h-24 w-24 text-primary" />
                </div>
                <p className="text-sm text-gray-500 mb-2">رمز الهدية</p>
                <p className="text-2xl font-bold tracking-wider">
                  {selectedGift.id}
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  تنزيل كود QR
                </Button>

                <Button
                  className="gap-2"
                  onClick={() => handleSendGiftViaWhatsApp("0612345678")}
                >
                  <Send className="h-4 w-4" />
                  إرسال عبر واتساب
                </Button>

                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  مشاركة الرابط
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="recipient-phone">رقم هاتف المستلم</Label>
                <div className="flex">
                  <Input
                    id="recipient-phone"
                    placeholder="أدخل رقم الهاتف"
                    className="rounded-l-none"
                  />
                  <Button
                    className="rounded-r-none"
                    onClick={() => handleSendGiftViaWhatsApp("0612345678")}
                  >
                    إرسال
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsShareGiftOpen(false)}>
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface GiftCardProps {
  gift: any;
  onEdit: () => void;
  onDuplicate: () => void;
  onDeactivate: () => void;
  onShare: () => void;
  onUse: () => void;
}

const GiftCard = ({
  gift,
  onEdit,
  onDuplicate,
  onDeactivate,
  onShare,
  onUse,
}: GiftCardProps) => {
  const getStatusBadge = () => {
    if (gift.isUsed) {
      return <Badge className="bg-purple-500">مستخدمة</Badge>;
    } else if (gift.status === "active") {
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
      case "custom":
        return "مخصص";
      default:
        return type;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      {gift.image && (
        <div className="h-40 w-full overflow-hidden">
          <img
            src={gift.image}
            alt={gift.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{gift.name}</CardTitle>
            <CardDescription>رمز الهدية: {gift.id}</CardDescription>
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
            {gift.value && (
              <span className="font-bold text-primary">{gift.value} د.م.‏</span>
            )}
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

      <CardFooter className="pt-2 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="gap-1" onClick={onEdit}>
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
          نسخ
        </Button>
        <Button variant="outline" size="sm" className="gap-1" onClick={onShare}>
          <Share2 className="h-4 w-4" />
          مشاركة
        </Button>

        {!gift.isUsed && (
          <Button variant="default" size="sm" className="gap-1" onClick={onUse}>
            <Check className="h-4 w-4" />
            استخدام
          </Button>
        )}

        {gift.status === "active" ? (
          <Button
            variant="outline"
            size="sm"
            className="gap-1 text-red-500 hover:text-red-700 hover:bg-red-50"
            onClick={onDeactivate}
          >
            <Ban className="h-4 w-4" />
            إلغاء
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

// Sample data
const quickGifts = [
  {
    id: "12345",
    name: "مشروب مجاني",
    description: "احصل على أي مشروب مجاني مع طلبك التالي",
    type: "free-drink",
    expiryDate: "2023-12-31",
    status: "active",
    isUsed: false,
    ownerName: "محمد أحمد",
    ownerPhone: "0612345678",
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
    value: "15",
  },
  {
    id: "54321",
    name: "خصم 10%",
    description: "احصل على خصم 10% على طلبك التالي",
    type: "discount",
    expiryDate: "2023-11-30",
    status: "active",
    isUsed: false,
    ownerName: "فاطمة علي",
    ownerPhone: "0612345679",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&q=80",
    value: "10%",
  },
  {
    id: "98765",
    name: "حلوى مجانية",
    description: "احصل على حلوى مجانية مع طلبك التالي",
    type: "free-dessert",
    expiryDate: "2023-12-15",
    status: "active",
    isUsed: true,
    ownerName: "أحمد محمود",
    ownerPhone: "0612345680",
    image:
      "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80",
    value: "25",
  },
  {
    id: "13579",
    name: "وجبة مجانية",
    description: "احصل على وجبة رئيسية مجانية",
    type: "free-item",
    expiryDate: "2023-12-20",
    status: "inactive",
    isUsed: false,
    ownerName: null,
    ownerPhone: null,
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&q=80",
    value: "85",
  },
  {
    id: "24680",
    name: "خصم 25%",
    description: "احصل على خصم 25% على طلبك التالي بقيمة 200 درهم أو أكثر",
    type: "discount",
    expiryDate: "2023-12-25",
    status: "active",
    isUsed: false,
    ownerName: null,
    ownerPhone: null,
    image:
      "https://images.unsplash.com/photo-1556742393-d75f468bfcb0?w=600&q=80",
    value: "25%",
  },
  {
    id: "11223",
    name: "طبق جانبي مجاني",
    description: "احصل على طبق جانبي مجاني مع أي وجبة رئيسية",
    type: "free-item",
    expiryDate: "2023-12-31",
    status: "inactive",
    isUsed: false,
    ownerName: "أحمد محمود",
    ownerPhone: "0612345680",
    image:
      "https://images.unsplash.com/photo-1594834749740-74b3f6764be4?w=600&q=80",
    value: "35",
  },
];

export default GiftManagement;
