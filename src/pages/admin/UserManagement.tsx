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
import {
  Users,
  Plus,
  Edit,
  Trash,
  Search,
  User,
  Phone,
  Mail,
  MapPin,
  Coins,
  Gift,
  CreditCard,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data
const users = [
  {
    id: "1",
    name: "محمد أحمد",
    phone: "0612345678",
    email: "mohamed@example.com",
    address: "شارع الحسن الثاني، الدار البيضاء",
    coinsBalance: 250,
    activeGifts: 2,
    status: "active",
    registeredAt: "2023-05-15",
    lastOrderAt: "2023-06-15",
  },
  {
    id: "2",
    name: "فاطمة علي",
    phone: "0612345679",
    email: "fatima@example.com",
    address: "شارع محمد الخامس، الرباط",
    coinsBalance: 120,
    activeGifts: 1,
    status: "active",
    registeredAt: "2023-04-20",
    lastOrderAt: "2023-06-10",
  },
  {
    id: "3",
    name: "أحمد محمود",
    phone: "0612345680",
    email: "ahmed@example.com",
    address: "شارع الزرقطوني، الدار البيضاء",
    coinsBalance: 75,
    activeGifts: 0,
    status: "inactive",
    registeredAt: "2023-03-10",
    lastOrderAt: "2023-05-20",
  },
];

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [isUserDetailsOpen, setIsUserDetailsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newUserData, setNewUserData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });

  const handleAddUser = () => {
    // Generate a random 4-digit PIN
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    console.log("Add user with PIN", pin, newUserData);
    setIsAddUserOpen(false);
    setNewUserData({
      name: "",
      phone: "",
      email: "",
      address: "",
    });

    // Show success message
    alert(`تم إنشاء المستخدم بنجاح. رمز PIN: ${pin}`);
  };

  const handleSendPinViaWhatsApp = (user: any) => {
    // Generate a new PIN
    const newPin = Math.floor(1000 + Math.random() * 9000).toString();

    // Create WhatsApp message
    const message = `مرحباً ${user.name}،\n\nإليك رمز PIN الجديد الخاص بك: *${newPin}*\n\nيرجى استخدام هذا الرمز لتسجيل الدخول إلى حسابك.`;
    const encodedMessage = encodeURIComponent(message);

    // Open WhatsApp with the message
    window.open(`https://wa.me/${user.phone}?text=${encodedMessage}`, "_blank");

    console.log("Sent new PIN to user", user.id, newPin);
  };

  const handleEditUser = () => {
    // Here you would update the user in the database
    console.log("Edit user", selectedUser);
    setIsEditUserOpen(false);
  };

  const handleViewUserDetails = (user: any) => {
    setSelectedUser(user);
    setIsUserDetailsOpen(true);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      (user.email &&
        user.email.toLowerCase().includes(searchTerm.toLowerCase())),
  );

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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">إدارة المستخدمين</h1>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              إضافة مستخدم جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="rtl">
            <DialogHeader>
              <DialogTitle>إضافة مستخدم جديد</DialogTitle>
              <DialogDescription>أدخل تفاصيل المستخدم الجديد</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="user-name">الاسم</Label>
                <Input
                  id="user-name"
                  placeholder="أدخل اسم المستخدم"
                  value={newUserData.name}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-phone">رقم الهاتف</Label>
                <Input
                  id="user-phone"
                  placeholder="أدخل رقم الهاتف"
                  value={newUserData.phone}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, phone: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-email">البريد الإلكتروني (اختياري)</Label>
                <Input
                  id="user-email"
                  type="email"
                  placeholder="أدخل البريد الإلكتروني"
                  value={newUserData.email}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="user-address">العنوان (اختياري)</Label>
                <Input
                  id="user-address"
                  placeholder="أدخل العنوان"
                  value={newUserData.address}
                  onChange={(e) =>
                    setNewUserData({ ...newUserData, address: e.target.value })
                  }
                />
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium mb-1">كلمة المرور:</p>
                <p className="text-sm">
                  سيتم توليد رمز PIN مكون من 4 أرقام تلقائياً
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                إلغاء
              </Button>
              <Button
                onClick={handleAddUser}
                disabled={!newUserData.name || !newUserData.phone}
              >
                إنشاء مستخدم
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
            placeholder="البحث عن مستخدم..."
            className="pl-3 pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">جميع المستخدمين</TabsTrigger>
          <TabsTrigger value="active">نشطين</TabsTrigger>
          <TabsTrigger value="inactive">غير نشطين</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredUsers.length > 0 ? (
            <div className="overflow-hidden rounded-lg border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-right">
                    <th className="p-3 font-medium">الاسم</th>
                    <th className="p-3 font-medium">رقم الهاتف</th>
                    <th className="p-3 font-medium">البريد الإلكتروني</th>
                    <th className="p-3 font-medium">رصيد الكوينز</th>
                    <th className="p-3 font-medium">البطاقات والهدايا</th>
                    <th className="p-3 font-medium">الحالة</th>
                    <th className="p-3 font-medium">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.phone}</td>
                      <td className="p-3">{user.email || "-"}</td>
                      <td className="p-3">{user.coinsBalance}</td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div
                            className="flex items-center gap-1"
                            title="بطاقات الولاء"
                          >
                            <CreditCard className="h-4 w-4 text-blue-500" />
                            <span>3</span>
                          </div>
                          <div
                            className="flex items-center gap-1"
                            title="الهدايا النشطة"
                          >
                            <Gift className="h-4 w-4 text-pink-500" />
                            <span>{user.activeGifts}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        {user.status === "active" ? (
                          <Badge className="bg-green-500">نشط</Badge>
                        ) : (
                          <Badge className="bg-gray-500">غير نشط</Badge>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() => handleViewUserDetails(user)}
                          >
                            <User className="h-4 w-4" />
                            عرض
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsEditUserOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                            تعديل
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-1 text-green-600 hover:bg-green-50"
                            onClick={() => handleSendPinViaWhatsApp(user)}
                          >
                            <Phone className="h-4 w-4" />
                            PIN
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
              <p className="text-lg font-medium text-gray-500">
                لم يتم العثور على مستخدمين
              </p>
            </div>
          )}
        </TabsContent>

        {/* Other tabs would filter the users accordingly */}
        <TabsContent value="active" className="space-y-4">
          {/* Active users */}
        </TabsContent>
      </Tabs>

      {/* Edit User Dialog */}
      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="rtl">
          <DialogHeader>
            <DialogTitle>تعديل بيانات المستخدم</DialogTitle>
            <DialogDescription>
              تعديل بيانات المستخدم {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-user-name">الاسم</Label>
                <Input
                  id="edit-user-name"
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-user-phone">رقم الهاتف</Label>
                <Input
                  id="edit-user-phone"
                  value={selectedUser.phone}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, phone: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-user-email">البريد الإلكتروني</Label>
                <Input
                  id="edit-user-email"
                  type="email"
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-user-address">العنوان</Label>
                <Input
                  id="edit-user-address"
                  value={selectedUser.address}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      address: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-user-status">الحالة</Label>
                <Select
                  value={selectedUser.status}
                  onValueChange={(value) =>
                    setSelectedUser({ ...selectedUser, status: value })
                  }
                >
                  <SelectTrigger id="edit-user-status">
                    <SelectValue placeholder="اختر الحالة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="inactive">غير نشط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              إلغاء
            </Button>
            <Button onClick={handleEditUser}>حفظ التغييرات</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* User Details Dialog */}
      <Dialog open={isUserDetailsOpen} onOpenChange={setIsUserDetailsOpen}>
        <DialogContent className="rtl">
          <DialogHeader>
            <DialogTitle>تفاصيل المستخدم</DialogTitle>
            <DialogDescription>
              عرض تفاصيل المستخدم {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">الاسم</p>
                  <p className="font-medium">{selectedUser.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">رقم الهاتف</p>
                  <p className="font-medium">{selectedUser.phone}</p>
                </div>
              </div>

              {selectedUser.email && (
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">البريد الإلكتروني</p>
                    <p className="font-medium">{selectedUser.email}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">العنوان</p>
                  <p className="font-medium">{selectedUser.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Coins className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">رصيد الكوينز</p>
                  <p className="font-medium">{selectedUser.coinsBalance}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Gift className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">الهدايا النشطة</p>
                  <p className="font-medium">{selectedUser.activeGifts}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">تاريخ التسجيل</p>
                  <p className="font-medium">
                    {formatDate(selectedUser.registeredAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">آخر طلب</p>
                  <p className="font-medium">
                    {formatDate(selectedUser.lastOrderAt)}
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUserDetailsOpen(false)}
            >
              إغلاق
            </Button>
            <Button
              onClick={() => {
                setIsUserDetailsOpen(false);
                setIsEditUserOpen(true);
              }}
            >
              تعديل
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;
