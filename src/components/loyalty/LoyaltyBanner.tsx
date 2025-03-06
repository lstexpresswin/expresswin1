import React, { useState } from "react";
import { Button } from "../ui/button";
import { Diamond, Gift, Info, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CheckCircle } from "lucide-react";

interface LoyaltyBannerProps {
  stamps?: number;
  coins?: number;
  onViewCard?: () => void;
}

const LoyaltyBanner = ({
  stamps = 3,
  coins = 120,
  onViewCard = () => console.log("View loyalty card"),
}: LoyaltyBannerProps) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isAddGiftOpen, setIsAddGiftOpen] = useState(false);
  const [giftType, setGiftType] = useState("");
  const [giftCode, setGiftCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);

  const handleAddGift = () => {
    if (!giftType || !giftCode) return;

    setIsVerifying(true);

    // Simulate API verification
    setTimeout(() => {
      setIsVerifying(false);

      // Mock verification results based on gift type and code
      if (giftType === "loyalty-card" && giftCode === "1234567") {
        setVerificationResult({
          success: true,
          type: "loyalty-card",
          name: "بطاقة الوجبات الرئيسية",
          reward: "وجبة رئيسية مجانية عند جمع 7 طوابع",
          expiry: "2024-12-31",
        });
      } else if (giftType === "quick-gift" && giftCode === "12345") {
        setVerificationResult({
          success: true,
          type: "quick-gift",
          name: "مشروب مجاني",
          description: "احصل على أي مشروب مجاني مع طلبك التالي",
          uses: 1,
          expiry: "2023-12-31",
        });
      } else if (giftType === "coins" && giftCode === "COINS100") {
        setVerificationResult({
          success: true,
          type: "coins",
          name: "كوينز إضافية",
          value: 100,
        });
      } else {
        setVerificationResult({
          success: false,
          message:
            "لم يتم العثور على الهدية أو البطاقة. يرجى التحقق من الرمز وإعادة المحاولة.",
        });
      }
    }, 1500);
  };

  const handleConfirmGift = () => {
    // Here you would save the gift to the user's account
    console.log("Gift added to user account", verificationResult);
    setIsAddGiftOpen(false);
    setGiftType("");
    setGiftCode("");
    setVerificationResult(null);
  };

  const resetGiftDialog = () => {
    setGiftType("");
    setGiftCode("");
    setVerificationResult(null);
  };

  return (
    <div className="w-full bg-gradient-to-r from-pink-500 to-orange-500 p-4 flex justify-between items-center rtl rounded-lg shadow-md">
      <div className="flex items-center">
        <div className="bg-white/20 p-2 rounded-full mr-3">
          <Gift className="h-5 w-5 text-white" />
        </div>
        <div className="text-white">
          <p className="font-bold text-lg">برنامج الولاء</p>
          <p className="text-sm">
            لديك <span className="font-bold">{stamps}</span> طوابع و{" "}
            <span className="font-bold">{coins}</span> نقطة
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <Dialog open={isInfoOpen} onOpenChange={setIsInfoOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 bg-white/20 hover:bg-white/30 text-white"
            >
              <Info className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="rtl">
            <DialogHeader>
              <DialogTitle>كيفية استخدام برنامج الولاء</DialogTitle>
              <DialogDescription>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start gap-3">
                    <Diamond className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-bold">الطوابع والبطاقات</h4>
                      <p className="text-sm text-muted-foreground">
                        اجمع الطوابع عند كل طلب. عند اكتمال البطاقة (7 طوابع)
                        تحصل على وجبة مجانية.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Gift className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-bold">الهدايا السريعة</h4>
                      <p className="text-sm text-muted-foreground">
                        استخدم رمز الهدية المكون من 5 أرقام عند تقديم الطلب
                        للحصول على هديتك.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Diamond className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-bold">الكوينز</h4>
                      <p className="text-sm text-muted-foreground">
                        اجمع الكوينز مع كل طلب واستبدلها بخصومات ومكافآت.
                      </p>
                    </div>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog
          open={isAddGiftOpen}
          onOpenChange={(open) => {
            setIsAddGiftOpen(open);
            if (!open) resetGiftDialog();
          }}
        >
          <DialogTrigger asChild>
            <Button
              onClick={() => setIsAddGiftOpen(true)}
              className="bg-white text-pink-600 hover:bg-white/90 px-4 py-2 rounded-md text-sm font-bold shadow-sm flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              إضافة هدية
            </Button>
          </DialogTrigger>
          <DialogContent className="rtl bg-gradient-to-r from-pink-50 to-orange-50 border-pink-200">
            <DialogHeader>
              <DialogTitle className="text-pink-600 text-xl">
                إضافة هدية جديدة
              </DialogTitle>
              <DialogDescription>
                أدخل نوع الهدية ورمزها للتحقق وإضافتها إلى حسابك
              </DialogDescription>
            </DialogHeader>

            {!verificationResult ? (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="gift-type">نوع الهدية</Label>
                  <Select value={giftType} onValueChange={setGiftType}>
                    <SelectTrigger id="gift-type">
                      <SelectValue placeholder="اختر نوع الهدية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="loyalty-card">بطاقة ولاء</SelectItem>
                      <SelectItem value="quick-gift">هدية سريعة</SelectItem>
                      <SelectItem value="coins">كوينز</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gift-code">رمز الهدية أو البطاقة</Label>
                  <Input
                    id="gift-code"
                    placeholder="أدخل الرمز"
                    value={giftCode}
                    onChange={(e) => setGiftCode(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleAddGift}
                  className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                  disabled={!giftType || !giftCode || isVerifying}
                >
                  {isVerifying ? "جاري التحقق..." : "التحقق من الرمز"}
                </Button>
              </div>
            ) : (
              <div className="py-4">
                {verificationResult.success ? (
                  <div className="space-y-4">
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <AlertTitle className="text-green-700">مبروك!</AlertTitle>
                      <AlertDescription className="text-green-600">
                        تم التحقق من الرمز بنجاح
                      </AlertDescription>
                    </Alert>

                    <div className="bg-white p-4 rounded-lg border border-pink-100 space-y-3">
                      {verificationResult.type === "loyalty-card" && (
                        <>
                          <h3 className="font-bold text-lg text-pink-600">
                            {verificationResult.name}
                          </h3>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <span className="font-bold">المكافأة:</span>{" "}
                              {verificationResult.reward}
                            </p>
                            <p className="text-sm">
                              <span className="font-bold">صالحة حتى:</span>{" "}
                              {new Date(
                                verificationResult.expiry,
                              ).toLocaleDateString("ar-MA")}
                            </p>
                          </div>
                        </>
                      )}

                      {verificationResult.type === "quick-gift" && (
                        <>
                          <h3 className="font-bold text-lg text-pink-600">
                            {verificationResult.name}
                          </h3>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <span className="font-bold">الوصف:</span>{" "}
                              {verificationResult.description}
                            </p>
                            <p className="text-sm">
                              <span className="font-bold">
                                عدد الاستخدامات:
                              </span>{" "}
                              {verificationResult.uses}
                            </p>
                            <p className="text-sm">
                              <span className="font-bold">صالحة حتى:</span>{" "}
                              {new Date(
                                verificationResult.expiry,
                              ).toLocaleDateString("ar-MA")}
                            </p>
                          </div>
                        </>
                      )}

                      {verificationResult.type === "coins" && (
                        <>
                          <h3 className="font-bold text-lg text-pink-600">
                            {verificationResult.name}
                          </h3>
                          <div className="space-y-2">
                            <p className="text-sm">
                              <span className="font-bold">القيمة:</span>{" "}
                              {verificationResult.value} كوينز
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ) : (
                  <Alert className="bg-red-50 border-red-200">
                    <AlertTitle className="text-red-700">
                      خطأ في التحقق
                    </AlertTitle>
                    <AlertDescription className="text-red-600">
                      {verificationResult.message}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            <DialogFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => {
                  if (verificationResult) {
                    resetGiftDialog();
                  } else {
                    setIsAddGiftOpen(false);
                  }
                }}
              >
                {verificationResult ? "رجوع" : "إلغاء"}
              </Button>

              {verificationResult?.success && (
                <Button
                  onClick={handleConfirmGift}
                  className="bg-gradient-to-r from-pink-500 to-orange-500 text-white"
                >
                  تأكيد إضافة الهدية
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LoyaltyBanner;
