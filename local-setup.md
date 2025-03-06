# دليل إعداد التطبيق للتطوير المحلي

هذا الدليل يشرح كيفية إعداد تطبيق طلب الطعام مع نظام الولاء للتطوير المحلي على جهازك.

## المتطلبات الأساسية

- Node.js (الإصدار 14 أو أعلى)
- npm أو yarn
- MySQL (الإصدار 5.7 أو أعلى)
- Git

## خطوات الإعداد

### 1. استنساخ المستودع

```bash
git clone https://github.com/yourusername/food-ordering-app.git
cd food-ordering-app
```

### 2. تثبيت التبعيات

```bash
npm install
# أو
yarn install
```

### 3. إعداد قاعدة البيانات

#### إنشاء قاعدة البيانات

1. قم بتسجيل الدخول إلى MySQL:

```bash
mysql -u root -p
```

2. أنشئ قاعدة بيانات جديدة:

```sql
CREATE DATABASE food_ordering_app;
EXIT;
```

3. قم باستيراد مخطط قاعدة البيانات:

```bash
mysql -u root -p food_ordering_app < database.sql
```

### 4. إعداد ملف البيئة

قم بإنشاء ملف `.env` في المجلد الرئيسي للمشروع:

```bash
cp .env.example .env
```

ثم قم بتعديل الملف بإعدادات قاعدة البيانات الخاصة بك:

```
VITE_APP_API_URL=http://localhost:3001/api
VITE_APP_WHATSAPP_NUMBER=+212600000000
VITE_APP_CURRENCY=د.م.‏
VITE_APP_RESTAURANT_NAME=مطعمنا
VITE_APP_RESTAURANT_ADDRESS=شارع الحسن الثاني، الدار البيضاء

# متغيرات قاعدة البيانات
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=food_ordering_app
DB_PORT=3306
```

### 5. تشغيل التطبيق في وضع التطوير

```bash
npm run dev
# أو
yarn dev
```

سيتم تشغيل التطبيق على `http://localhost:5173`

## هيكل المشروع

```
├── public/             # الملفات الثابتة
├── src/                # كود المصدر
│   ├── components/     # مكونات React
│   │   ├── cart/       # مكونات سلة التسوق
│   │   ├── layout/     # مكونات التخطيط
│   │   ├── loyalty/    # مكونات نظام الولاء
│   │   ├── menu/       # مكونات قائمة الطعام
│   │   ├── orders/     # مكونات الطلبات
│   │   ├── profile/    # مكونات الملف الشخصي
│   │   └── ui/         # مكونات واجهة المستخدم العامة
│   ├── lib/            # مكتبات المساعدة
│   ├── pages/          # صفحات التطبيق
│   │   └── admin/      # صفحات لوحة تحكم المسؤول
│   ├── App.tsx         # مكون التطبيق الرئيسي
│   └── main.tsx        # نقطة الدخول
├── database.sql        # مخطط قاعدة البيانات
└── README.md           # توثيق المشروع
```

## بيانات تسجيل الدخول للعرض التوضيحي

### تطبيق المستخدم
- **رقم الهاتف**: 0612345678
- **رمز PIN**: 1234

### لوحة تحكم المسؤول
- **البريد الإلكتروني**: admin@example.com
- **كلمة المرور**: password

## إضافة خادم API

لتطوير تطبيق كامل، ستحتاج إلى إنشاء خادم API. يمكنك استخدام Express.js أو NestJS لإنشاء خادم API RESTful.

### إعداد خادم Express.js بسيط

1. قم بإنشاء مجلد `server` في المجلد الرئيسي للمشروع:

```bash
mkdir server
cd server
npm init -y
npm install express cors mysql2 dotenv
npm install --save-dev typescript ts-node @types/express @types/cors @types/node
```

2. قم بإنشاء ملف `tsconfig.json` في مجلد `server`:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
```

3. قم بإنشاء هيكل المجلدات التالي في مجلد `server`:

```
server/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── index.ts
├── package.json
└── tsconfig.json
```

4. قم بإنشاء ملف `src/index.ts` الأساسي:

```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API is running');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

5. أضف سكريبت تشغيل إلى `package.json` في مجلد `server`:

```json
{
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

6. قم بتشغيل الخادم:

```bash
cd server
npm run dev
```

الخادم سيعمل على `http://localhost:3001`

## تكوين Proxy للتطوير

لتجنب مشاكل CORS أثناء التطوير، يمكنك إعداد proxy في ملف `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
```

## الخطوات التالية

1. قم بتطوير نماذج وطرق API للتعامل مع:
   - المستخدمين والمصادقة
   - قائمة الطعام والفئات
   - الطلبات
   - نظام الولاء (البطاقات، الطوابع، العملات، الهدايا)

2. قم بربط واجهة المستخدم بالـ API

3. قم بتنفيذ المصادقة والتفويض

4. قم باختبار التطبيق بشكل شامل

## استكشاف الأخطاء وإصلاحها

### مشاكل قاعدة البيانات

- تأكد من أن خدمة MySQL قيد التشغيل
- تحقق من صحة بيانات اعتماد قاعدة البيانات في ملف `.env`
- تأكد من استيراد مخطط قاعدة البيانات بشكل صحيح

### مشاكل الخادم

- تحقق من سجلات الخادم للحصول على أي أخطاء
- تأكد من أن المنافذ المطلوبة متاحة وغير مستخدمة من قبل تطبيقات أخرى

### مشاكل العميل

- امسح ذاكرة التخزين المؤقت للمتصفح
- تحقق من وحدة تحكم المتصفح للحصول على أي أخطاء
- تأكد من أن متغيرات البيئة محددة بشكل صحيح
