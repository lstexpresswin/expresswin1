import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Diamond, Info } from "lucide-react";
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
import { Progress } from "../ui/progress";

interface LoyaltyCardProps {
  id?: string;
  name?: string;
  description?: string;
  stamps?: number;
  maxStamps?: number;
  reward?: string;
  onAddStamp?: (cardId: string, code: string) => void;
  onUseReward?: (cardId: string) => void;
}

const LoyaltyCard = ({
  id = "1234567",
  name = "بطاقة الوجبات الرئيسية",
  description = "اجمع 7 طوابع واحصل على وجبة رئيسية مجانية",
  stamps = 5,
  maxStamps = 7,
  reward = "وجبة رئيسية مجانية",
  onAddStamp = (cardId, code) =>
    console.log(`Add stamp to card ${cardId} with code ${code}`),
  onUseReward = (cardId) => console.log(`Use reward for card ${cardId}`),
}: LoyaltyCardProps) => {
  const [stampCode, setStampCode] = useState("");
  const [isAddStampDialogOpen, setIsAddStampDialogOpen] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);

  const handleAddStamp = () => {
    if (stampCode.trim()) {
      onAddStamp(id, stampCode);
      setStampCode("");
      setIsAddStampDialogOpen(false);
    }
  };

  const progress = (stamps / maxStamps) * 100;
  const isComplete = stamps >= maxStamps;

  return (
    <Card className="w-full max-w-md overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow rtl">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{name}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <Dialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Info className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="rtl">
              <DialogHeader>
                <DialogTitle>كيفية استخدام بطاقة الولاء</DialogTitle>
                <DialogDescription>
                  <div className="mt-4 space-y-4">
                    <p>
                      رقم البطاقة: <span className="font-bold">{id}</span>
                    </p>
                    <p>1. اطلب طابعًا عند كل زيارة بقيمة تتجاوز 50 درهم.</p>
                    <p>
                      2. أدخل رمز الطابع المكون من 5 أرقام لإضافته إلى بطاقتك.
                    </p>
                    <p>
                      3. عند اكتمال جمع {maxStamps} طوابع، يمكنك استبدالها بـ{" "}
                      {reward}.
                    </p>
                    <p>
                      4. استخدم البطاقة عند تقديم الطلب للاستفادة من المكافأة.
                    </p>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-600">
              {stamps} من {maxStamps} طوابع
            </span>
            <span className="text-sm font-medium">
              {isComplete ? "مكتملة! 🎉" : `${Math.round(progress)}%`}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex justify-between items-center mt-4">
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: maxStamps }).map((_, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${index < stamps ? "bg-primary text-white" : "bg-gray-100 text-gray-400"}`}
              >
                <Diamond
                  className={`h-4 w-4 ${index < stamps ? "text-white" : "text-gray-400"}`}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <Dialog
          open={isAddStampDialogOpen}
          onOpenChange={setIsAddStampDialogOpen}
        >
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              إضافة طابع
            </Button>
          </DialogTrigger>
          <DialogContent className="rtl">
            <DialogHeader>
              <DialogTitle>إضافة طابع جديد</DialogTitle>
              <DialogDescription>
                أدخل رمز الطابع المكون من 5 أرقام لإضافته إلى بطاقتك
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="stamp-code">رمز الطابع</Label>
                <Input
                  id="stamp-code"
                  placeholder="أدخل الرمز المكون من 5 أرقام"
                  value={stampCode}
                  onChange={(e) => setStampCode(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <Button onClick={handleAddStamp} className="mt-2">
                  إضافة
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          disabled={!isComplete}
          onClick={() => onUseReward(id)}
          className={`${isComplete ? "bg-primary text-white" : "bg-gray-100 text-gray-400"}`}
        >
          استخدام المكافأة
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LoyaltyCard;
