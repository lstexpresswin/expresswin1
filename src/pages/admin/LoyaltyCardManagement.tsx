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
import { Switch } from "@/components/ui/switch";
import {
  CreditCard,
  Plus,
  Copy,
  Stamp,
  Send,
  MessageSquare,
  Edit,
  Trash,
  Search,
  Power,
  Filter,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LoyaltyCardManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCardOpen, setIsAddCardOpen] = useState(false);
  const [isEditCardOpen, setIsEditCardOpen] = useState(false);
  const [isAddStampOpen, setIsAddStampOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [newCardData, setNewCardData] = useState({
    name: "",
    maxStamps: "7",
    reward: "",
    description: "",
    isActive: true,
  });
  const [generatedStampCode, setGeneratedStampCode] = useState("");

  const handleAddCard = () => {
    // Here you would add the card to the database
    console.log("Add card", newCardData);
    setIsAddCardOpen(false);
    setNewCardData({
      name: "",
      maxStamps: "7",
      reward: "",
      description: "",
      isActive: true,
    });
  };

  const handleEditCard = () => {
    // Here you would update the card in the database
    console.log("Edit card", selectedCard);
    setIsEditCardOpen(false);
  };

  const handleDuplicateCard = (card: any) => {
    // Generate a new 7-digit ID for the duplicated card
    const newId = Math.floor(1000000 + Math.random() * 9000000).toString();

    // Create a duplicate card with the new ID
    const duplicatedCard = {
      ...card,
      id: newId,
      ownerName: null,
      ownerPhone: null,
      stamps: 0,
    };

    // Here you would add the duplicated card to the database
    console.log("Duplicate card with new ID", duplicatedCard);

    // Show success message
    alert(`تم تكرار البطاقة بنجاح. الرقم الجديد: ${newId}`);
  };

  const handleAddStamp = (card: any) => {
    setSelectedCard(card);
    // Generate a random 5-digit code
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    setGeneratedStampCode(code);
    setIsAddStampOpen(true);
  };

  const handleSendStampCode = (method: "whatsapp" | "sms") => {
    if (method === "whatsapp" && selectedCard) {
      const message = `مرحباً ${selectedCard.ownerName}،\n\nإليك رمز الطابع الخاص بك: *${generatedStampCode}*\n\nيمكنك إضافته إلى بطاقة الولاء الخاصة بك للحصول على المكافآت!`;
      const encodedMessage = encodeURIComponent(message);
      window.open(
        `https://wa.me/${selectedCard.ownerPhone}?text=${encodedMessage}`,
        "_blank",
      );
    } else if (method === "sms") {
      // Here you would send an SMS
      console.log(
        "Send SMS with code",
        generatedStampCode,
        "to",
        selectedCard?.ownerPhone,
      );
    }
    setIsAddStampOpen(false);
  };

  const handleToggleCardStatus = (card: any) => {
    console.log("Toggle card status", card);
    // Here you would update the card status in the database
  };

  const filteredCards = loyaltyCards.filter(
    (card) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (card.ownerName &&
        card.ownerName.toLowerCase().includes(searchTerm.toLowerCase())),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة بطاقات الولاء</h1>
        <Dialog open={isAddCardOpen} onOpenChange={setIsAddCardOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              إضافة بطاقة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="rtl">
            <DialogHeader>
              <DialogTitle>إضافة بطاقة ولاء جديدة</DialogTitle>
              <DialogDescription>
                أدخل تفاصيل بطاقة الولاء الجديدة
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="card-name">اسم البطاقة</Label>
                <Input
                  id="card-name"
                  placeholder="مثال: بطاقة الوجبات الرئيسية"
                  value={newCardData.name}
                  onChange={(e) =>
                    setNewCardData({ ...newCardData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-description">وصف قصير</Label>
                <Input
                  id="card-description"
                  placeholder="وصف قصير للبطاقة"
                  value={newCardData.description}
                  onChange={(e) =>
                    setNewCardData({
                      ...newCardData,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="card-id">رقم البطاقة</Label>
                <div className="flex gap-2">
                  <Input
                    id="card-id"
                    value={Math.floor(
                      1000000 + Math.random() * 9000000,
                    ).toString()}
                    readOnly
                    className="bg-gray-50"
                  />
                  <Button variant="outline" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  رقم فريد مكون من 7 أرقام (يتم توليده تلقائياً)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-stamps">عدد الطوابع المطلوبة</Label>
                <Select
                  value={newCardData.maxStamps}
                  onValueChange={(value) =>
                    setNewCardData({ ...newCardData, maxStamps: value })
                  }
                >
                  <SelectTrigger id="max-stamps">
                    <SelectValue placeholder="اختر عدد الطوابع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 طوابع</SelectItem>
                    <SelectItem value="6">6 طوابع</SelectItem>
                    <SelectItem value="7">7 طوابع</SelectItem>
                    <SelectItem value="8">8 طوابع</SelectItem>
                    <SelectItem value="10">10 طوابع</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reward">المكافأة</Label>
                <Input
                  id="reward"
                  placeholder="مثال: وجبة رئيسية مجانية"
                  value={newCardData.reward}
                  onChange={(e) =>
                    setNewCardData({ ...newCardData, reward: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="card-active"
                  checked={newCardData.isActive}
                  onCheckedChange={(checked) =>
                    setNewCardData({ ...newCardData, isActive: checked })
                  }
                />
                <Label htmlFor="card-active">البطاقة نشطة</Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddCardOpen(false)}>
                إلغاء
              </Button>
              <Button
                onClick={handleAddCard}
                disabled={!newCardData.name || !newCardData.reward}
              >
                إنشاء بطاقة
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
              placeholder="البحث عن بطاقة ولاء..."
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
                <SelectItem value="stamps-desc">الأختام (تنازلي)</SelectItem>
                <SelectItem value="stamps-asc">الأختام (تصاعدي)</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              تصفية
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">جميع البطاقات</TabsTrigger>
          <TabsTrigger value="active">نشطة</TabsTrigger>
          <TabsTrigger value="inactive">غير نشطة</TabsTrigger>
          <TabsTrigger value="owned">مملوكة</TabsTrigger>
          <TabsTrigger value="unowned">غير مملوكة</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCards.map((card) => (
                <LoyaltyCard
                  key={card.id}
                  card={card}
                  onEdit={() => {
                    setSelectedCard(card);
                    setIsEditCardOpen(true);
                  }}
                  onDuplicate={() => handleDuplicateCard(card)}
                  onAddStamp={() => handleAddStamp(card)}
                  onToggleStatus={() => handleToggleCardStatus(card)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <CreditCard className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-500">
                لم يتم العثور على بطاقات ولاء
              </p>
            </div>
          )}
        </TabsContent>

        {/* Other tabs would filter the cards accordingly */}
        <TabsContent value="active" className="space-y-4">
          {/* Active cards */}
        </TabsContent>
      </Tabs>

      {/* Edit Card Dialog */}
      <Dialog open={isEditCardOpen} onOpenChange={setIsEditCardOpen}>
        <DialogContent className="rtl">
          <DialogHeader>
            <DialogTitle>تعديل بطاقة الولاء</DialogTitle>
            <DialogDescription>
              تعديل تفاصيل بطاقة الولاء {selectedCard?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedCard && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-card-name">اسم البطاقة</Label>
                <Input
                  id="edit-card-name"
                  value={selectedCard.name}
                  onChange={(e) =>
                    setSelectedCard({ ...selectedCard, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-card-description">وصف قصير</Label>
                <Input
                  id="edit-card-description"
                  value={selectedCard.description || ""}
                  onChange={(e) =>
                    setSelectedCard({
                      ...selectedCard,
                      description: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-max-stamps">عدد الطوابع المطلوبة</Label>
                <Select
                  value={selectedCard.maxStamps.toString()}
                  onValueChange={(value) =>
                    setSelectedCard({
                      ...selectedCard,
                      maxStamps: parseInt(value),
                    })
                  }
                >
                  <SelectTrigger id="edit-max-stamps">
                    <SelectValue placeholder="اختر عدد الطوابع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 طوابع</SelectItem>
                    <SelectItem value="6">6 طوابع</SelectItem>
                    <SelectItem value="7">7 طوابع</SelectItem>
                    <SelectItem value="8">8 طوابع</SelectItem>
                    <SelectItem value="10">10 طوابع</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-reward">المكافأة</Label>
                <Input
                  id="edit-reward"
                  value={selectedCard.reward}
                  onChange={(e) =>
                    setSelectedCard({ ...selectedCard, reward: e.target.value })
                  }
                />
              </div>

              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="edit-card-active"
                  checked={selectedCard.isActive}
                  onCheckedChange={(checked) =>
                    setSelectedCard({ ...selectedCard, isActive: checked })
                  }
                />
                <Label htmlFor="edit-card-active">البطاقة نشطة</Label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCardOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleEditCard}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Stamp Dialog */}
      <Dialog open={isAddStampOpen} onOpenChange={setIsAddStampOpen}>
        <DialogContent className="rtl">
          <DialogHeader>
            <DialogTitle>إضافة طابع</DialogTitle>
            <DialogDescription>
              توليد رمز طابع جديد للبطاقة {selectedCard?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedCard && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-gray-50 rounded-lg text-center">
                <p className="text-sm text-gray-500 mb-2">رمز الطابع</p>
                <p className="text-2xl font-bold tracking-wider">
                  {generatedStampCode}
                </p>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <h3 className="font-bold text-blue-700 mb-2">
                  مراحل المكافآت:
                </h3>
                <div className="space-y-2">
                  {loyaltyLevels.map((level) => (
                    <div
                      key={level.stamps}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                          {level.stamps}
                        </div>
                        <span>{level.reward}</span>
                      </div>
                      {selectedCard.stamps >= level.stamps ? (
                        <Badge className="bg-green-500">مكتمل</Badge>
                      ) : (
                        <Badge variant="outline">
                          متبقي {level.stamps - selectedCard.stamps}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedCard.ownerPhone && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">إرسال الرمز إلى:</p>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{selectedCard.ownerName}</p>
                      <p className="text-sm text-gray-500">
                        {selectedCard.ownerPhone}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => handleSendStampCode("sms")}
                      >
                        <Send className="h-4 w-4" />
                        SMS
                      </Button>
                      <Button
                        size="sm"
                        className="gap-1"
                        onClick={() => handleSendStampCode("whatsapp")}
                      >
                        <MessageSquare className="h-4 w-4" />
                        واتساب
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddStampOpen(false)}>
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface LoyaltyCardProps {
  card: any;
  onEdit: () => void;
  onDuplicate: () => void;
  onAddStamp: () => void;
  onToggleStatus: () => void;
}

const LoyaltyCard = ({
  card,
  onEdit,
  onDuplicate,
  onAddStamp,
  onToggleStatus,
}: LoyaltyCardProps) => {
  const getStatusBadge = () => {
    if (card.isActive) {
      return <Badge className="bg-green-500">نشطة</Badge>;
    } else {
      return <Badge className="bg-gray-500">غير نشطة</Badge>;
    }
  };

  const getOwnershipBadge = () => {
    if (card.ownerName) {
      return <Badge className="bg-blue-500">مملوكة</Badge>;
    } else {
      return <Badge className="bg-yellow-500">غير مملوكة</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{card.name}</CardTitle>
            <CardDescription>رقم البطاقة: {card.id}</CardDescription>
          </div>
          <div className="flex flex-col gap-1">
            {getStatusBadge()}
            {getOwnershipBadge()}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="space-y-3">
          {card.description && (
            <div className="text-sm text-gray-600">{card.description}</div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              الطوابع: {card.stamps} من {card.maxStamps}
            </span>
            <span className="text-sm font-medium">
              {Math.round((card.stamps / card.maxStamps) * 100)}%
            </span>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full"
              style={{ width: `${(card.stamps / card.maxStamps) * 100}%` }}
            ></div>
          </div>

          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium mb-1">المكافأة:</p>
            <p className="text-sm">{card.reward}</p>
          </div>

          {card.ownerName && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium mb-1">المالك:</p>
              <p className="text-sm">{card.ownerName}</p>
              <p className="text-xs text-gray-500">{card.ownerPhone}</p>
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

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={onToggleStatus}
          >
            <Power className="h-4 w-4" />
            {card.isActive ? "تعطيل" : "تفعيل"}
          </Button>
          <Button
            variant="default"
            size="sm"
            className="gap-1"
            onClick={onAddStamp}
          >
            <Stamp className="h-4 w-4" />
            إضافة طابع
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

// Sample data
const loyaltyCards = [
  {
    id: "1234567",
    name: "بطاقة الوجبات الرئيسية",
    description: "عميل منتظم - يفضل الأطباق التقليدية",
    stamps: 5,
    maxStamps: 7,
    reward: "وجبة رئيسية مجانية",
    isActive: true,
    ownerName: "محمد أحمد",
    ownerPhone: "0612345678",
  },
  {
    id: "7654321",
    name: "بطاقة المشروبات",
    description: "تفضل المشروبات الساخنة",
    stamps: 3,
    maxStamps: 5,
    reward: "مشروب مجاني",
    isActive: true,
    ownerName: "فاطمة علي",
    ownerPhone: "0612345679",
  },
  {
    id: "9876543",
    name: "بطاقة الحلويات",
    description: "",
    stamps: 2,
    maxStamps: 6,
    reward: "حلوى مجانية",
    isActive: true,
    ownerName: null,
    ownerPhone: null,
  },
  {
    id: "1357924",
    name: "بطاقة البيتزا",
    description: "للعملاء الجدد",
    stamps: 0,
    maxStamps: 8,
    reward: "بيتزا مجانية",
    isActive: false,
    ownerName: null,
    ownerPhone: null,
  },
];

const loyaltyLevels = [
  { stamps: 3, reward: "خصم 10% على الطلب التالي" },
  { stamps: 5, reward: "مشروب مجاني مع أي طلب" },
  { stamps: 7, reward: "حلوى مجانية مع أي طلب" },
  { stamps: 10, reward: "وجبة رئيسية مجانية" },
];

export default LoyaltyCardManagement;
