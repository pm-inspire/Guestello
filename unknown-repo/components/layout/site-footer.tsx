"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">مضيف</h3>
            <p className="text-sm text-muted-foreground">
              منصة لحجز خدمات الفنادق لغير النزلاء مع عروض فورية وتجارب فاخرة.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">روابط سريعة</h4>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <Link href="/profile">الملف الشخصي</Link>
              <Link href="/notifications">الإشعارات</Link>
              <Link href="/auth/login">تسجيل الدخول</Link>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">التواصل</h4>
            <p className="text-sm text-muted-foreground">
              البريد: hello@mudif.sa
            </p>
            <p className="text-sm text-muted-foreground">
              الهاتف: +966 9200 00000
            </p>
          </div>
        </div>
        <Separator className="my-6" />
        <p className="text-xs text-muted-foreground">
          © 2026 مضيف. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
