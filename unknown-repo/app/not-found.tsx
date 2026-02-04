"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center gap-4 px-4 py-12 text-center">
      <h1 className="text-3xl font-semibold">الصفحة غير موجودة</h1>
      <p className="text-sm text-muted-foreground">
        يبدو أنك وصلت إلى رابط غير صحيح.
      </p>
      <Button asChild>
        <Link href="/">العودة للرئيسية</Link>
      </Button>
    </div>
  );
}
