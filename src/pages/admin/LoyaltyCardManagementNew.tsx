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
  CreditCard,
  Plus,
  Copy,
  Stamp,
  Send,
  MessageSquare,
  Edit,
  Trash,
  Search,
  X,
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
    reward: "",
    stages: [{ stamps: 5, reward: "" }],
  });
  const [generatedStampCode, setGeneratedStampCode] = useState("");
  const [activeCards, setActiveCards] = useState(loyaltyCards);

  const handleAddStage = () => {
    setNewCardData({
      ...newCardData,
      stages: [...newCardData.stages, { stamps: 5, reward: "" }],
    });
  };

  const handleRemoveStage = (index: number) => {
    if (newCardData.stages.length > 1) {
      const newStages = [...newCardData.stages];
      newStages.splice(index, 1);
      setNewCardData({
        ...newCardData,
        stages: newStages,
      });
    }
  };

  const handleStageChange = (index: number, field: string, value: any) => {
    const newStages = [...newCardData.stages];
    newStages[index] = { ...newStages[index], [field]: value };
    setNewCardData({
      ...newCardData,
      stages: newStages,
    });
  };

  const handleAddCard = () => {
    // Generate a new 7-digit ID
    const newId = Math.floor(1000000 + Math.random() * 9000000).toString();

    // Create a new card
    const newCard = {
      id: newId,
      name: newCardData.name,
      stamps: 0,
      maxStamps: newCardData.stages[0].stamps,
      reward: newCardData.stages[0].reward || newCardData.reward,
      status: "active",
      ownerName: null,
      ownerPhone: null,
      stages: newCardData.stages,
    };

    // Add the new card to the active cards
    setActiveCards([...activeCards, newCard]);

    // Reset the form
    setIsAddCardOpen(false);
    setNewCardData({
      name: "",
      reward: "",
      stages: [{ stamps: 5, reward: "" }],
    });

    // Show success message
    alert(`تم إنشاء بطاقة الولاء بنجاح. الرقم: ${newId}`);
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

    // Add the duplicated card to the active cards
    setActiveCards([...activeCards, duplicatedCard]);

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

  const filteredCards = activeCards.filter(
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
          <DialogContent className="rtl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>إضافة بطاقة ولاء جديدة</DialogTitle>
              <DialogDescription>
                أدخل تفاصيل بطاقة الولاء الجديدة مع المراحل المختلفة
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

              <div className="border p-4 rounded-md bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold">مراحل البطاقة</h3>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddStage}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    إضافة مرحلة
                  </Button>
                </div>

                {newCardData.stages.map((stage, index) => (
                  <div
                    key={index}
                    className="mb-4 p-3 border rounded-md bg-white relative"
                  >
                    <div className="absolute top-2 right-2 flex items-center gap-1">
                      <Badge variant="outline">{`المرحلة ${index + 1}`}</Badge>
                      {index > 0 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-red-500"
                          onClick={() => handleRemoveStage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor={`stage-${index}-stamps`}>
                          عدد الطوابع
                        </Label>
                        <Input
                          id={`stage-${index}-stamps`}
                          type="number"
                          min="1"
                          value={stage.stamps}
                          onChange={(e) =>
                            handleStageChange(
                              index,
                              "stamps",
                              parseInt(e.target.value) || 5,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`stage-${index}-reward`}>
                          المكافأة
                        </Label>
                        <Input
                          id={`stage-${index}-reward`}
                          placeholder="مثال: وجبة مجانية"
                          value={stage.reward}
                          onChange={(e) =>
                            handleStageChange(index, "reward", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddCardOpen(false)}>
                إلغاء
              </Button>
              <Button
                onClick={handleAddCard}
                disabled={
                  !newCardData.name ||
                  newCardData.stages.some((stage) => !stage.reward)
                }
              >
                إنشاء بطاقة
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
            placeholder="البحث عن بطاقة ولاء..."
            className="pl-3 pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
        <DialogContent className="rtl max-h-[90vh] overflow-y-auto">
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

              <div className="space-y-2">
                <Label htmlFor="edit-status">الحالة</Label>
                <Select
                  value={selectedCard.status}
                  onValueChange={(value) =>
                    setSelectedCard({ ...selectedCard, status: value })
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
}

const LoyaltyCard = ({
  card,
  onEdit,
  onDuplicate,
  onAddStamp,
}: LoyaltyCardProps) => {
  const getStatusBadge = () => {
    if (card.status === "active") {
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

        <Button
          variant="default"
          size="sm"
          className="gap-1"
          onClick={onAddStamp}
        >
          <Stamp className="h-4 w-4" />
          إضافة طابع
        </Button>
      </CardFooter>
    </Card>
  );
};

// Sample data
const loyaltyCards = [
  {
    id: "1234567",
    name: "بطاقة الوجبات الرئيسية",
    stamps: 5,
    maxStamps: 7,
    reward: "وجبة رئيسية مجانية",
    status: "active",
    ownerName: "محمد أحمد",
    ownerPhone: "0612345678",
    stages: [{ stamps: 7, reward: "وجبة رئيسية مجانية" }],
  },
  {
    id: "7654321",
    name: "بطاقة المشروبات",
    stamps: 3,
    maxStamps: 5,
    reward: "مشروب مجاني",
    status: "active",
    ownerName: "فاطمة علي",
    ownerPhone: "0612345679",
    stages: [{ stamps: 5, reward: "مشروب مجاني" }],
  },
  {
    id: "9876543",
    name: "بطاقة الحلويات",
    stamps: 2,
    maxStamps: 6,
    reward: "حلوى مجانية",
    status: "active",
    ownerName: null,
    ownerPhone: null,
    stages: [{ stamps: 6, reward: "حلوى مجانية" }],
  },
  {
    id: "1357924",
    name: "بطاقة البيتزا",
    stamps: 0,
    maxStamps: 8,
    reward: "بيتزا مجانية",
    status: "inactive",
    ownerName: null,
    ownerPhone: null,
    stages: [{ stamps: 8, reward: "بيتزا مجانية" }],
  },
];

export default LoyaltyCardManagement;
