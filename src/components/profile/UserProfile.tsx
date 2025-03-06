import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { User, Phone, MapPin, Key, Edit } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface UserProfileProps {
  name?: string;
  phone?: string;
  address?: string;
  pin?: string;
  onUpdateProfile?: (profile: {
    name: string;
    phone: string;
    address: string;
    pin: string;
  }) => void;
}

const UserProfile = ({
  name = "محمد أحمد",
  phone = "0612345678",
  address = "شارع الحسن الثاني، الدار البيضاء",
  pin = "1234",
  onUpdateProfile = (profile) => console.log("Update profile", profile),
}: UserProfileProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name,
    phone,
    address,
    pin,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onUpdateProfile(formData);
    setIsEditDialogOpen(false);
  };

  return (
    <Card className="w-full max-w-md overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow rtl">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">الملف الشخصي</CardTitle>
            <CardDescription>معلومات الحساب الشخصية</CardDescription>
          </div>
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex gap-1">
                <Edit className="h-4 w-4" />
                تعديل
              </Button>
            </DialogTrigger>
            <DialogContent className="rtl">
              <DialogHeader>
                <DialogTitle>تعديل الملف الشخصي</DialogTitle>
                <DialogDescription>
                  قم بتحديث معلوماتك الشخصية
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">الاسم</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">العنوان</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pin">رمز PIN (4 أرقام)</Label>
                  <Input
                    id="pin"
                    name="pin"
                    type="password"
                    maxLength={4}
                    value={formData.pin}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSubmit} className="mt-2">
                    تحديث
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <User className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">الاسم</p>
            <p className="font-medium">{name}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Phone className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">رقم الهاتف</p>
            <p className="font-medium">{phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">العنوان</p>
            <p className="font-medium">{address}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Key className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-gray-500">رمز PIN</p>
            <p className="font-medium">••••</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
