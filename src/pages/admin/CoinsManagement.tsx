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
import { Coins, Plus, Copy, Edit, Trash, Search, Check, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data
const coinCodes = [
  {
    id: "COINS100",
    value: 100,
    status: "unused",
    createdAt: "2023-06-15",
  },
  {
    id: "COINS50",
    value: 50,
    status: "unused",
    createdAt: "2023-06-14",
  },
  {
    id: "COINS200",
    value: 200,
    status: "used",
    createdAt: "2023-06-10",
    usedBy: "محمد أحمد",
    usedAt: "2023-06-12",
  },
  {
    id: "COINS75",
    value: 75,
    status: "used",
    createdAt: "2023-06-08",
    usedBy: "فاطمة علي",
    usedAt: "2023-06-09",
  },
];

const CoinsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddCodeOpen, setIsAddCodeOpen] = useState(false);
  const [isEditCodeOpen, setIsEditCodeOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState<any>(null);
  const [newCodeValue, setNewCodeValue] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");

  const handleAddCode = () => {
    // Here you would add the code to the database
    console.log("Add code with value", newCodeValue);
    setIsAddCodeOpen(false);
    setNewCodeValue("");
    setGeneratedCode("");
  };

  const handleEditCode = () => {
    // Here you would update the code in the database
    console.log("Edit code", selectedCode);
    setIsEditCodeOpen(false);
  };

  const handleGenerateCode = () => {
    // Generate a code with * and 5 random digits
    const digits = "0123456789";
    let code = "*";
    for (let i = 0; i < 5; i++) {
      code += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    setGeneratedCode(code);
  };

  const filteredCodes = coinCodes.filter(
    (code) =>
      code.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.value.toString().includes(searchTerm),
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة الكوينز</h1>
        <Dialog open={isAddCodeOpen} onOpenChange={setIsAddCodeOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              إضافة كود جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="rtl">
            <DialogHeader>
              <DialogTitle>إضافة كود كوينز جديد</DialogTitle>
              <DialogDescription>
                أدخل قيمة الكوينز وقم بتوليد كود جديد
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="coins-value">قيمة الكوينز</Label>
                <Input
                  id="coins-value"
                  type="number"
                  placeholder="مثال: 100"
                  value={newCodeValue}
                  onChange={(e) => setNewCodeValue(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code-id">كود الكوينز</Label>
                <div className="flex gap-2">
                  <Input
                    id="code-id"
                    value={generatedCode}
                    readOnly
                    className="bg-gray-50"
                    placeholder="اضغط على زر التوليد"
                  />
                  <Button variant="outline" onClick={handleGenerateCode}>
                    توليد
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  كود فريد للكوينز (يمكنك توليده تلقائياً)
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddCodeOpen(false)}>
                إلغاء
              </Button>
              <Button
                onClick={handleAddCode}
                disabled={!newCodeValue || !generatedCode}
              >
                إنشاء كود
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
            placeholder="البحث عن كود كوينز..."
            className="pl-3 pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">جميع الأكواد</TabsTrigger>
          <TabsTrigger value="unused">غير مستخدمة</TabsTrigger>
          <TabsTrigger value="used">مستخدمة</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredCodes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCodes.map((code) => (
                <CoinCodeCard
                  key={code.id}
                  code={code}
                  onEdit={() => {
                    setSelectedCode(code);
                    setIsEditCodeOpen(true);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Coins className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-500">
                لم يتم العثور على أكواد كوينز
              </p>
            </div>
          )}
        </TabsContent>

        {/* Other tabs would filter the codes accordingly */}
        <TabsContent value="unused" className="space-y-4">
          {/* Unused codes */}
        </TabsContent>
      </Tabs>

      {/* Edit Code Dialog */}
      <Dialog open={isEditCodeOpen} onOpenChange={setIsEditCodeOpen}>
        <DialogContent className="rtl">
          <DialogHeader>
            <DialogTitle>تعديل كود الكوينز</DialogTitle>
            <DialogDescription>
              تعديل تفاصيل كود الكوينز {selectedCode?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedCode && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-coins-value">قيمة الكوينز</Label>
                <Input
                  id="edit-coins-value"
                  type="number"
                  value={selectedCode.value}
                  onChange={(e) =>
                    setSelectedCode({
                      ...selectedCode,
                      value: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-status">الحالة</Label>
                <Select
                  value={selectedCode.status}
                  onValueChange={(value) =>
                    setSelectedCode({ ...selectedCode, status: value })
                  }
                >
                  <SelectTrigger id="edit-status">
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unused">غير مستخدم</SelectItem>
                    <SelectItem value="used">مستخدم</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditCodeOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleEditCode}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

interface CoinCodeCardProps {
  code: any;
  onEdit: () => void;
}

const CoinCodeCard = ({ code, onEdit }: CoinCodeCardProps) => {
  const getStatusBadge = () => {
    if (code.status === "unused") {
      return <Badge className="bg-green-500">غير مستخدم</Badge>;
    } else {
      return <Badge className="bg-gray-500">مستخدم</Badge>;
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

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{code.id}</CardTitle>
            <CardDescription>
              تم الإنشاء: {formatDate(code.createdAt)}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-1">{getStatusBadge()}</div>
        </div>
      </CardHeader>

      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex items-center gap-2 bg-primary/10 p-3 rounded-lg">
            <Coins className="h-5 w-5 text-primary" />
            <span className="text-xl font-bold">{code.value}</span>
            <span className="text-sm">كوينز</span>
          </div>

          {code.status === "used" && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium mb-1">تم استخدامه بواسطة:</p>
              <p className="text-sm">{code.usedBy}</p>
              <p className="text-xs text-gray-500">
                بتاريخ: {formatDate(code.usedAt)}
              </p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2 flex justify-between">
        <Button variant="outline" size="sm" className="gap-1" onClick={onEdit}>
          <Edit className="h-4 w-4" />
          تعديل
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="gap-1 text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash className="h-4 w-4" />
          حذف
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CoinsManagement;
