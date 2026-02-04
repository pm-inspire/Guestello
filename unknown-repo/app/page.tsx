"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { CitySelect } from "@/components/search/city-select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ServiceCategoryCard } from "@/components/cards/service-category-card";
import { HotelCard } from "@/components/cards/hotel-card";
import { mockHotels, mockServices } from "@/lib/data";

export default function Home() {
  const [city, setCity] = useState("riyadh");
  const featured = useMemo(() => mockHotels.slice(0, 4), []);

  return (
    <div className="bg-background">
      <section className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs text-muted-foreground">
              منصة حجز خدمات الفنادق لغير النزلاء
            </div>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              احجز خدمات الفنادق بسهولة
              <span className="block text-primary">في دقائق وبأفضل العروض</span>
            </h1>
            <p className="text-base text-muted-foreground sm:text-lg">
              اختر مدينتك واستمتع بتجارب المطاعم، السبا والأنشطة الفندقية مع
              عروض 1+1 مثل تطبيق The Entertainer.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <CitySelect value={city} onValueChange={setCity} />
              <Button asChild size="lg">
                <Link href={`/${city}/dining`}>ابدأ الحجز الآن</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href={`/${city}/hotels`}>استعرض العروض</Link>
              </Button>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid gap-4 sm:grid-cols-2"
          >
            {featured.map((item) => (
              <HotelCard key={item.id} data={item} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-muted/30 py-12">
        <div className="mx-auto w-full max-w-6xl px-4 lg:px-6">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold">اختر نوع الخدمة</h2>
              <p className="text-sm text-muted-foreground">
                خدمات متعددة تناسب الضيوف وغير الضيوف
              </p>
            </div>
            <Button variant="ghost" asChild>
              <Link href={`/${city}/dining`}>عرض الكل</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {mockServices.map((service) => (
              <ServiceCategoryCard
                key={service.id}
                service={service}
                city={city}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "ابحث عن المدينة",
              description: "فلتر الخدمات حسب مدينتك المفضلة.",
            },
            {
              title: "اختر الخدمة",
              description: "مطاعم، سبا، أنشطة أو حجوزات يومية.",
            },
            {
              title: "احجز فوراً",
              description: "دفع العربون أو التوصيل مع تأكيد فوري.",
            },
          ].map((step, index) => (
            <Card key={step.title}>
              <CardContent className="space-y-3 p-6">
                <div className="text-sm font-semibold text-primary">
                  خطوة {index + 1}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
