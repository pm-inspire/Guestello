# مضيف | Hotel Services Marketplace (Prototype)

واجهة كاملة لحجز خدمات الفنادق (مطاعم، سبا، أنشطة، حجوزات يومية) بواجهة عربية
RTL مستوحاة من تطبيقات العروض مثل The Entertainer. تعتمد على Next.js 14/16
App Router مع Tailwind CSS و Shadcn/UI.

## التشغيل محلياً

```bash
npm install
npm run dev
```

ثم افتح: [http://localhost:3000](http://localhost:3000)

## المزايا الرئيسية

- واجهة عربية RTL مع خط Cairo.
- صفحات كاملة: الصفحة الرئيسية، قائمة الخدمات، التفاصيل، تسجيل الدخول/التسجيل،
  الملف الشخصي، الإشعارات، نجاح الطلب.
- حجز الطاولة مع تقويم، أوقات متاحة، عربون وهمي (Stripe Mock).
- طلب توصيل مع سلة وجمع العناوين.
- إشعارات، طلبات، وعناوين محفوظة عبر localStorage.
- ثيم داكن/فاتح + رسوم انتقالية بسيطة.
- بيانات وهمية JSON في `/lib/data`.

## المسارات

- `/` الصفحة الرئيسية
- `/:city/:service` قائمة الخدمات
- `/:city/:service/:id` تفاصيل الخدمة
- `/auth/login` تسجيل الدخول
- `/auth/register` إنشاء حساب
- `/profile` الملف الشخصي
- `/notifications` الإشعارات
- `/order-success/:id` نجاح الطلب

## نقاط API (Placeholders)

> جاهزة للربط مع Laravel لاحقاً.

- `POST /api/bookings` إنشاء حجز
- `POST /api/stripe/deposit` دفع العربون
- `POST /api/auth/[...nextauth]` مصادقة (Mock)

## تكامل Laravel المقترح

- `POST /api/bookings` → إنشاء حجز طاولة أو طلب توصيل.
- `GET /api/hotels?city=&service=` → قائمة الخدمات.
- `GET /api/hotels/:id` → تفاصيل الخدمة + المنيو.
- `POST /api/payments/deposit` → دفع عربون عبر Stripe.

## ملاحظات

- البيانات الوهمية موجودة في `/lib/data/*.json`.
- إدارة الحالة: NextAuth (Mock) + UserContext/CartContext (localStorage).
- التصميم متوافق مع الشاشات الصغيرة (Mobile-first).
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
