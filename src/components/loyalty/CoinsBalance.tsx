import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Coins, Plus } from "lucide-react";
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

interface CoinsBalanceProps {
  balance?: number;
  onAddCoins?: (code: string) => void;
}

const CoinsBalance = ({
  balance = 120,
  onAddCoins = (code) => console.log(`Add coins with code ${code}`),
}: CoinsBalanceProps) => {
  const [coinsCode, setCoinsCode] = useState("");
  const [isAddCoinsDialogOpen, setIsAddCoinsDialogOpen] = useState(false);

  const handleAddCoins = () => {
    if (coinsCode.trim()) {
      onAddCoins(coinsCode);
      setCoinsCode("");
      setIsAddCoinsDialogOpen(false);
    }
  };

  return (
    <Card className="w-full max-w-md overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow rtl">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Coins className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">رصيد الكوينز</CardTitle>
              <CardDescription>استبدل الكوينز بخصومات ومكافآت</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Coins className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold">{balance}</span>
          </div>

          <Dialog
            open={isAddCoinsDialogOpen}
            onOpenChange={setIsAddCoinsDialogOpen}
          >
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex gap-1">
                <Plus className="h-4 w-4" />
                إضافة كوينز
              </Button>
            </DialogTrigger>
            <DialogContent className="rtl">
              <DialogHeader>
                <DialogTitle>إضافة كوينز</DialogTitle>
                <DialogDescription>
                  أدخل رمز الكوينز لإضافته إلى رصيدك
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="coins-code">رمز الكوينز</Label>
                  <Input
                    id="coins-code"
                    placeholder="أدخل رمز الكوينز"
                    value={coinsCode}
                    onChange={(e) => setCoinsCode(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleAddCoins} className="mt-2">
                    إضافة
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <div className="w-full">
          <h3 className="text-sm font-medium mb-2">استبدل الكوينز بـ:</h3>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              خصم 10% - 100 كوينز
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              وجبة مجانية - 200 كوينز
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              مشروب مجاني - 50 كوينز
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              حلوى مجانية - 75 كوينز
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CoinsBalance;
