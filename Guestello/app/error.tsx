"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center gap-4 px-4 py-12 text-center">
      <h2 className="text-2xl font-semibold">حدث خطأ غير متوقع</h2>
      <p className="text-sm text-muted-foreground">
        الرجاء إعادة المحاولة أو العودة للصفحة الرئيسية.
      </p>
      <div className="flex gap-3">
        <Button onClick={() => reset()}>إعادة المحاولة</Button>
        <Button variant="outline" onClick={() => (window.location.href = "/")}>
          العودة للرئيسية
        </Button>
      </div>
    </div>
  );
}
