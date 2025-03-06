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
  DollarSign,
  Plus,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  LineChart,
  BarChart3,
  PieChart,
  Download,
  Filter,
  Search,
  FileText,
  Printer,
  CreditCard,
  Wallet,
  Receipt,
  Tag,
  Edit,
  Trash,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const FinancialManagement = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("month");
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [transactionType, setTransactionType] = useState("income");
  const [searchTerm, setSearchTerm] = useState("");
  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "cash",
  });

  const handleAddTransaction = () => {
    console.log("Add transaction", transactionType, newTransaction);
    setIsAddTransactionOpen(false);
    setNewTransaction({
      amount: "",
      category: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
      paymentMethod: "cash",
    });
  };

  const filteredTransactions = transactions.filter((transaction) => {
    return (
      transaction.description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">الإدارة المالية</h1>
          <p className="text-gray-500 mt-1">
            إدارة الإيرادات والمصروفات والتقارير المالية
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog
            open={isAddTransactionOpen}
            onOpenChange={setIsAddTransactionOpen}
          >
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                إضافة معاملة
              </Button>
            </DialogTrigger>
            <DialogContent className="rtl max-w-md">
              <DialogHeader>
                <DialogTitle>إضافة معاملة جديدة</DialogTitle>
                <DialogDescription>
                  أدخل تفاصيل المعاملة المالية الجديدة
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div className="flex w-full rounded-md overflow-hidden">
                  <Button
                    type="button"
                    variant={
                      transactionType === "income" ? "default" : "outline"
                    }
                    className="flex-1 rounded-none"
                    onClick={() => setTransactionType("income")}
                  >
                    <ArrowUpRight className="h-4 w-4 mr-2" />
                    إيرادات
                  </Button>
                  <Button
                    type="button"
                    variant={
                      transactionType === "expense" ? "default" : "outline"
                    }
                    className="flex-1 rounded-none"
                    onClick={() => setTransactionType("expense")}
                  >
                    <ArrowDownRight className="h-4 w-4 mr-2" />
                    مصروفات
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transaction-amount">المبلغ</Label>
                  <div className="relative">
                    <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="transaction-amount"
                      type="number"
                      placeholder="أدخل المبلغ"
                      className="pl-3 pr-10"
                      value={newTransaction.amount}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          amount: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transaction-category">الفئة</Label>
                  <Select
                    value={newTransaction.category}
                    onValueChange={(value) =>
                      setNewTransaction({ ...newTransaction, category: value })
                    }
                  >
                    <SelectTrigger id="transaction-category">
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      {transactionType === "income" ? (
                        <>
                          <SelectItem value="sales">مبيعات</SelectItem>
                          <SelectItem value="delivery">توصيل</SelectItem>
                          <SelectItem value="other-income">
                            إيرادات أخرى
                          </SelectItem>
                        </>
                      ) : (
                        <>
                          <SelectItem value="ingredients">
                            مكونات ومواد خام
                          </SelectItem>
                          <SelectItem value="salaries">رواتب</SelectItem>
                          <SelectItem value="rent">إيجار</SelectItem>
                          <SelectItem value="utilities">مرافق</SelectItem>
                          <SelectItem value="marketing">تسويق</SelectItem>
                          <SelectItem value="other-expense">
                            مصروفات أخرى
                          </SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transaction-description">الوصف</Label>
                  <Textarea
                    id="transaction-description"
                    placeholder="أدخل وصفاً للمعاملة"
                    value={newTransaction.description}
                    onChange={(e) =>
                      setNewTransaction({
                        ...newTransaction,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="transaction-date">التاريخ</Label>
                    <Input
                      id="transaction-date"
                      type="date"
                      value={newTransaction.date}
                      onChange={(e) =>
                        setNewTransaction({
                          ...newTransaction,
                          date: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payment-method">طريقة الدفع</Label>
                    <Select
                      value={newTransaction.paymentMethod}
                      onValueChange={(value) =>
                        setNewTransaction({
                          ...newTransaction,
                          paymentMethod: value,
                        })
                      }
                    >
                      <SelectTrigger id="payment-method">
                        <SelectValue placeholder="اختر طريقة الدفع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">نقداً</SelectItem>
                        <SelectItem value="card">بطاقة ائتمان</SelectItem>
                        <SelectItem value="bank-transfer">
                          تحويل بنكي
                        </SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddTransactionOpen(false)}
                >
                  إلغاء
                </Button>
                <Button
                  onClick={handleAddTransaction}
                  disabled={
                    !newTransaction.amount ||
                    !newTransaction.category ||
                    !newTransaction.date
                  }
                >
                  إضافة
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="اختر الفترة" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">اليوم</SelectItem>
            <SelectItem value="week">هذا الأسبوع</SelectItem>
            <SelectItem value="month">هذا الشهر</SelectItem>
            <SelectItem value="quarter">هذا الربع</SelectItem>
            <SelectItem value="year">هذا العام</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          <span>15 يونيو - 15 يوليو</span>
        </Button>
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="income">الإيرادات</TabsTrigger>
          <TabsTrigger value="expenses">المصروفات</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Financial Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FinancialCard
              title="إجمالي الإيرادات"
              value="12,450"
              trend="+15%"
              trendUp={true}
              period="هذا الشهر"
              icon={<ArrowUpRight className="h-5 w-5" />}
              color="green"
            />

            <FinancialCard
              title="إجمالي المصروفات"
              value="8,320"
              trend="+8%"
              trendUp={false}
              period="هذا الشهر"
              icon={<ArrowDownRight className="h-5 w-5" />}
              color="red"
            />

            <FinancialCard
              title="صافي الربح"
              value="4,130"
              trend="+25%"
              trendUp={true}
              period="هذا الشهر"
              icon={<TrendingUp className="h-5 w-5" />}
              color="blue"
            />

            <FinancialCard
              title="متوسط قيمة الطلب"
              value="185"
              trend="+5%"
              trendUp={true}
              period="هذا الشهر"
              icon={<Receipt className="h-5 w-5" />}
              color="purple"
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">
                      الإيرادات والمصروفات
                    </CardTitle>
                    <CardDescription>مقارنة شهرية</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <LineChart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-gray-300" />
                  <span className="text-gray-400 mr-2">
                    رسم بياني للإيرادات والمصروفات
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg">توزيع المصروفات</CardTitle>
                    <CardDescription>حسب الفئة</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon">
                    <PieChart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-gray-300" />
                  <span className="text-gray-400 mr-2">
                    رسم بياني لتوزيع المصروفات
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">أحدث المعاملات</CardTitle>
                  <CardDescription>آخر 5 معاملات</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1"
                  onClick={() => setActiveTab("income")}
                >
                  <FileText className="h-4 w-4" />
                  <span>عرض الكل</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.slice(0, 5).map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${transaction.type === "income" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                      >
                        {transaction.type === "income" ? (
                          <ArrowUpRight className="h-5 w-5" />
                        ) : (
                          <ArrowDownRight className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className="text-xs bg-gray-50"
                          >
                            {getCategoryName(transaction.category)}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {transaction.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {transaction.amount} د.م.‏
                      </p>
                      <p className="text-xs text-gray-500">
                        {getPaymentMethodName(transaction.paymentMethod)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Income Tab */}
        <TabsContent value="income" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">الإيرادات</CardTitle>
                  <CardDescription>تفاصيل جميع الإيرادات</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative w-64">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="البحث..."
                      className="pl-3 pr-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    تصفية
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Printer className="h-4 w-4" />
                    طباعة
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-right">
                      <th className="p-3 font-medium">الوصف</th>
                      <th className="p-3 font-medium">الفئة</th>
                      <th className="p-3 font-medium">التاريخ</th>
                      <th className="p-3 font-medium">طريقة الدفع</th>
                      <th className="p-3 font-medium">المبلغ</th>
                      <th className="p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredTransactions
                      .filter((t) => t.type === "income")
                      .map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="p-3">{transaction.description}</td>
                          <td className="p-3">
                            <Badge variant="outline">
                              {getCategoryName(transaction.category)}
                            </Badge>
                          </td>
                          <td className="p-3">{transaction.date}</td>
                          <td className="p-3">
                            {getPaymentMethodName(transaction.paymentMethod)}
                          </td>
                          <td className="p-3 font-bold text-green-600">
                            +{transaction.amount} د.م.‏
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Expenses Tab */}
        <TabsContent value="expenses" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">المصروفات</CardTitle>
                  <CardDescription>تفاصيل جميع المصروفات</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative w-64">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="البحث..."
                      className="pl-3 pr-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    تصفية
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Printer className="h-4 w-4" />
                    طباعة
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-right">
                      <th className="p-3 font-medium">الوصف</th>
                      <th className="p-3 font-medium">الفئة</th>
                      <th className="p-3 font-medium">التاريخ</th>
                      <th className="p-3 font-medium">طريقة الدفع</th>
                      <th className="p-3 font-medium">المبلغ</th>
                      <th className="p-3 font-medium">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredTransactions
                      .filter((t) => t.type === "expense")
                      .map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="p-3">{transaction.description}</td>
                          <td className="p-3">
                            <Badge variant="outline">
                              {getCategoryName(transaction.category)}
                            </Badge>
                          </td>
                          <td className="p-3">{transaction.date}</td>
                          <td className="p-3">
                            {getPaymentMethodName(transaction.paymentMethod)}
                          </td>
                          <td className="p-3 font-bold text-red-600">
                            -{transaction.amount} د.م.‏
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500"
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">تقرير الإيرادات</CardTitle>
                <CardDescription>تحليل الإيرادات حسب الفئة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-gray-300" />
                  <span className="text-gray-400 mr-2">
                    رسم بياني للإيرادات
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">تقرير المصروفات</CardTitle>
                <CardDescription>تحليل المصروفات حسب الفئة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <PieChart className="h-16 w-16 text-gray-300" />
                  <span className="text-gray-400 mr-2">
                    رسم بياني للمصروفات
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">تقرير الأرباح</CardTitle>
                <CardDescription>تحليل الأرباح الشهرية</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <LineChart className="h-16 w-16 text-gray-300" />
                  <span className="text-gray-400 mr-2">رسم بياني للأرباح</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">تقرير المبيعات</CardTitle>
                <CardDescription>تحليل المبيعات حسب المنتج</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <BarChart3 className="h-16 w-16 text-gray-300" />
                  <span className="text-gray-400 mr-2">رسم بياني للمبيعات</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg">التقارير المتاحة</CardTitle>
                  <CardDescription>تنزيل التقارير المالية</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">تقرير الإيرادات الشهري</p>
                      <p className="text-sm text-gray-500">يونيو 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    تنزيل
                  </Button>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">تقرير المصروفات الشهري</p>
                      <p className="text-sm text-gray-500">يونيو 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    تنزيل
                  </Button>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">تقرير الأرباح والخسائر</p>
                      <p className="text-sm text-gray-500">الربع الثاني 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    تنزيل
                  </Button>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">تقرير المبيعات حسب المنتج</p>
                      <p className="text-sm text-gray-500">يونيو 2023</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    تنزيل
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface FinancialCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  period: string;
  icon: React.ReactNode;
  color: "green" | "red" | "blue" | "purple";
}

const FinancialCard = ({
  title,
  value,
  trend,
  trendUp,
  period,
  icon,
  color,
}: FinancialCardProps) => {
  const getColorClass = () => {
    switch (color) {
      case "green":
        return "bg-green-50 text-green-600";
      case "red":
        return "bg-red-50 text-red-600";
      case "blue":
        return "bg-blue-50 text-blue-600";
      case "purple":
        return "bg-purple-50 text-purple-600";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div
          className={`h-9 w-9 rounded-full ${getColorClass()} flex items-center justify-center`}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value} د.م.‏</div>
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-muted-foreground">{period}</p>
          <div className="flex items-center gap-1">
            {trendUp ? (
              <ArrowUpRight className="h-3 w-3 text-green-600" />
            ) : (
              <ArrowDownRight className="h-3 w-3 text-red-600" />
            )}
            <p
              className={`text-xs ${trendUp ? "text-green-600" : "text-red-600"}`}
            >
              {trend}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const getCategoryName = (category: string) => {
  switch (category) {
    // Income categories
    case "sales":
      return "مبيعات";
    case "delivery":
      return "توصيل";
    case "other-income":
      return "إيرادات أخرى";

    // Expense categories
    case "ingredients":
      return "مكونات ومواد خام";
    case "salaries":
      return "رواتب";
    case "rent":
      return "إيجار";
    case "utilities":
      return "مرافق";
    case "marketing":
      return "تسويق";
    case "other-expense":
      return "مصروفات أخرى";
    default:
      return category;
  }
};

const getPaymentMethodName = (method: string) => {
  switch (method) {
    case "cash":
      return "نقداً";
    case "card":
      return "بطاقة ائتمان";
    case "bank-transfer":
      return "تحويل بنكي";
    case "other":
      return "أخرى";
    default:
      return method;
  }
};

// Sample data
const transactions = [
  {
    id: "1",
    type: "income",
    amount: 1250,
    category: "sales",
    description: "مبيعات اليوم",
    date: "2023-06-15",
    paymentMethod: "cash",
  },
  {
    id: "2",
    type: "expense",
    amount: 450,
    category: "ingredients",
    description: "شراء مكونات",
    date: "2023-06-15",
    paymentMethod: "cash",
  },
  {
    id: "3",
    type: "income",
    amount: 950,
    category: "sales",
    description: "مبيعات المساء",
    date: "2023-06-14",
    paymentMethod: "card",
  },
  {
    id: "4",
    type: "expense",
    amount: 1200,
    category: "salaries",
    description: "رواتب الموظفين",
    date: "2023-06-10",
    paymentMethod: "bank-transfer",
  },
  {
    id: "5",
    type: "income",
    amount: 180,
    category: "delivery",
    description: "رسوم التوصيل",
    date: "2023-06-14",
    paymentMethod: "cash",
  },
  {
    id: "6",
    type: "expense",
    amount: 350,
    category: "utilities",
    description: "فاتورة الكهرباء",
    date: "2023-06-05",
    paymentMethod: "bank-transfer",
  },
  {
    id: "7",
    type: "expense",
    amount: 200,
    category: "marketing",
    description: "إعلانات فيسبوك",
    date: "2023-06-08",
    paymentMethod: "card",
  },
  {
    id: "8",
    type: "income",
    amount: 1500,
    category: "sales",
    description: "مبيعات نهاية الأسبوع",
    date: "2023-06-12",
    paymentMethod: "cash",
  },
];

export default FinancialManagement;
