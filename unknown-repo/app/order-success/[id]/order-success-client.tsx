"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { useUser } from "@/components/providers/user-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function OrderSuccessClient() {
  const params = useParams<{ id: string }>();
  const { orders } = useUser();
  const order = orders.find((item) => item.id === params?.id);

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-3xl items-center justify-center px-4 py-12">
      <Card className="w-full">
        <CardContent className="space-y-6 p-8 text-center">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-8 w-8" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">تم تأكيد الطلب!</h1>
            <p className="text-sm text-muted-foreground">
              رقم الطلب: #{params?.id}
            </p>
          </div>
          {order && (
            <div className="rounded-lg border bg-muted/30 p-4 text-sm">
              <p>
                الحالة: <strong>{order.status}</strong>
              </p>
              <p>
                الخدمة: <strong>{order.serviceName}</strong>
              </p>
              <p>
                المجموع: <strong>{order.total} SAR</strong>
              </p>
            </div>
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link href="/profile">تتبع الطلب</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">العودة للرئيسية</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
