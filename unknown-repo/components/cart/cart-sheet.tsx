"use client";

import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function CartSheet() {
  const { items, itemCount, subtotal, updateQty, removeItem, clear } = useCart();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingBag className="h-4 w-4" />
          {itemCount > 0 && (
            <span className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>سلة الطلبات</SheetTitle>
          <SheetDescription>إدارة طلبات التوصيل بسرعة.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 space-y-4 overflow-y-auto py-4">
          {items.length === 0 ? (
            <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
              لا توجد عناصر بعد. أضف أطباقك المفضلة!
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="space-y-3 rounded-lg border p-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.price} SAR
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQty(item.id, Math.max(1, item.qty - 1))
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium">{item.qty}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <span className="text-sm font-semibold">
                    {item.price * item.qty} SAR
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        <Separator />
        <div className="space-y-3 pt-4">
          <div className="flex items-center justify-between text-sm">
            <span>الإجمالي</span>
            <span className="font-semibold">{subtotal} SAR</span>
          </div>
          <Button className="w-full" disabled={items.length === 0}>
            إكمال الطلب
          </Button>
          {items.length > 0 && (
            <Button variant="ghost" className="w-full" onClick={clear}>
              تفريغ السلة
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
