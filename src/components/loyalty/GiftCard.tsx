import React from "react";
import { Button } from "../ui/button";
import { Gift, Calendar } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface GiftCardProps {
  id?: string;
  name?: string;
  description?: string;
  code?: string;
  expiryDate?: string;
  onUse?: (giftId: string) => void;
}

const GiftCard = ({
  id = "12345",
  name = "مشروب مجاني",
  description = "احصل على أي مشروب مجاني مع طلبك التالي",
  code = "12345",
  expiryDate = "2023-12-31",
  onUse = (giftId) => console.log(`Use gift ${giftId}`),
}: GiftCardProps) => {
  const [isInfoDialogOpen, setIsInfoDialogOpen] = React.useState(false);

  // Format date to Arabic format
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

  // Check if gift is expired
  const isExpired = () => {
    try {
      const today = new Date();
      const expiry = new Date(expiryDate);
      return today > expiry;
    } catch (e) {
      return false;
    }
  };

  const expired = isExpired();

  return (
    <Card
      className={`w-full max-w-md overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow rtl ${expired ? "opacity-60" : ""}`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-full">
              <Gift className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">{name}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">رمز الهدية:</span>
            <span className="text-lg font-bold">{code}</span>
          </div>

          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>
              {expired ? "انتهت الصلاحية" : "صالحة حتى"}{" "}
              {formatDate(expiryDate)}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <Dialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              كيفية الاستخدام
            </Button>
          </DialogTrigger>
          <DialogContent className="rtl">
            <DialogHeader>
              <DialogTitle>كيفية استخدام الهدية</DialogTitle>
              <DialogDescription>
                <div className="mt-4 space-y-4">
                  <p>
                    رمز الهدية: <span className="font-bold">{code}</span>
                  </p>
                  <p>1. أضف الهدية إلى سلة التسوق عند تقديم طلبك.</p>
                  <p>2. سيتم تطبيق الهدية تلقائيًا على طلبك.</p>
                  <p>
                    3. تأكد من استخدام الهدية قبل تاريخ انتهاء الصلاحية:{" "}
                    {formatDate(expiryDate)}.
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Button
          disabled={expired}
          onClick={() => onUse(id)}
          className={
            expired ? "bg-gray-100 text-gray-400" : "bg-primary text-white"
          }
        >
          استخدام
        </Button>
      </CardFooter>
    </Card>
  );
};

export default GiftCard;
