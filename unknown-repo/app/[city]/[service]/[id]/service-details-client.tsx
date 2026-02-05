"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/components/providers/cart-provider";
import { useUser } from "@/components/providers/user-provider";
import { useCrowdStatus } from "@/hooks/use-crowd-status";
import { mockAvailability, mockHotels, mockMenus } from "@/lib/data";

const crowdConfig = {
  low: { label: "منخفض", value: 30 },
  medium: { label: "متوسط", value: 60 },
  high: { label: "مرتفع", value: 90 },
} as const;

export function ServiceDetailsClient() {
  const router = useRouter();
  const params = useParams<{ city: string; service: string; id: string }>();
  const { addItem, subtotal, items } = useCart();
  const { addresses, addOrder } = useUser();
  const hotel = useMemo(
    () => mockHotels.find((item) => item.id === params?.id),
    [params?.id]
  );
  const menu = useMemo(
    () => mockMenus.find((group) => group.serviceId === params?.id),
    [params?.id]
  );
  const availability = useMemo(
    () => mockAvailability.find((item) => item.serviceId === params?.id),
    [params?.id]
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedAddress, setSelectedAddress] = useState(
    addresses[0]?.id ?? ""
  );
  const [customAddress, setCustomAddress] = useState("");
  const crowdStatus = useCrowdStatus(hotel?.crowd ?? "medium");

  if (!hotel) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-20 text-center">
        <p className="text-lg font-semibold">الخدمة غير متوفرة حالياً.</p>
      </div>
    );
  }

  const dayKey = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const dayAvailability =
    availability?.days.find((day) => day.date === dayKey) ?? null;

  const handleBookingConfirm = () => {
    const bookingId = `ORD-${Math.floor(Math.random() * 9000 + 1000)}`;
    addOrder({
      id: bookingId,
      type: "table",
      status: "Confirmed",
      serviceName: hotel.name,
      hotelName: hotel.hotelName,
      date: `${dayKey} ${selectedTime ?? "19:00"}`,
      total: 50,
    });
    router.push(`/order-success/${bookingId}`);
  };

  const handleDeliveryCheckout = () => {
    const bookingId = `ORD-${Math.floor(Math.random() * 9000 + 1000)}`;
    addOrder({
      id: bookingId,
      type: "delivery",
      status: "Pending",
      serviceName: hotel.name,
      hotelName: hotel.hotelName,
      date: format(new Date(), "yyyy-MM-dd HH:mm"),
      total: subtotal,
    });
    router.push(`/order-success/${bookingId}`);
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <div className="relative h-64 overflow-hidden rounded-2xl">
            <Image
              src={hotel.image}
              alt={hotel.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="secondary">{hotel.priceRange}</Badge>
            <Badge variant="outline">{hotel.hotelName}</Badge>
            {hotel.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold">{hotel.name}</h1>
            <p className="text-sm text-muted-foreground">
              ساعات العمل: 10:00 صباحاً - 12:00 منتصف الليل
            </p>
          </div>
          <Card>
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">حالة الازدحام الحالية</p>
                <span className="text-xs text-muted-foreground">
                  {crowdConfig[crowdStatus].label}
                </span>
              </div>
              <Progress value={crowdConfig[crowdStatus].value} />
              <p className="text-xs text-muted-foreground">
                يتم تحديث حالة الازدحام كل بضع دقائق.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="space-y-4 p-5">
              <h2 className="text-base font-semibold">الموقع على الخريطة</h2>
              <div className="relative h-52 overflow-hidden rounded-xl border">
                <iframe
                  title="map"
                  className="h-full w-full"
                  src="https://maps.google.com/maps?q=Riyadh&t=&z=13&ie=UTF8&iwloc=&output=embed"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                خريطة توضيحية فقط، سيتم ربط Google Maps لاحقاً.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">قائمة الخدمات والطلبات</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {(menu?.items ?? []).map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative h-32 w-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="space-y-3 p-4">
                    <div>
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">
                        {item.price} SAR
                      </span>
                      <Button
                        size="sm"
                        onClick={() =>
                          addItem({
                            id: item.id,
                            serviceId: hotel.id,
                            name: item.name,
                            price: item.price,
                            qty: 1,
                            image: item.image,
                          })
                        }
                      >
                        أضف للسلة
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="space-y-5 p-5">
              <h2 className="text-lg font-semibold">خيارات الحجز</h2>
              <Tabs defaultValue="table" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="table">حجز طاولة</TabsTrigger>
                  <TabsTrigger value="delivery">توصيل الطلب</TabsTrigger>
                </TabsList>
                <TabsContent value="table" className="space-y-4 pt-4">
                  <div className="rounded-lg border p-3">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="mx-auto"
                    />
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-semibold">الأوقات المتاحة</p>
                    <div className="grid grid-cols-3 gap-2">
                      {(dayAvailability?.slots ?? []).map((slot) => (
                        <Button
                          key={slot.time}
                          variant={
                            selectedTime === slot.time
                              ? "default"
                              : slot.available
                              ? "outline"
                              : "secondary"
                          }
                          className={
                            selectedTime === slot.time
                              ? ""
                              : slot.available
                              ? "border-emerald-500 text-emerald-600 hover:bg-emerald-50"
                              : "opacity-60"
                          }
                          disabled={!slot.available}
                          onClick={() => setSelectedTime(slot.time)}
                        >
                          {slot.time}
                        </Button>
                      ))}
                    </div>
                    {!dayAvailability && (
                      <p className="text-xs text-muted-foreground">
                        لا توجد أوقات متاحة لهذا اليوم.
                      </p>
                    )}
                  </div>
                  <div className="rounded-lg border bg-muted/30 p-4 text-sm">
                    العربون المطلوب: <strong>50 SAR</strong> (مهلة 15 دقيقة بعد
                    موعد الحجز)
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">ادفع العربون الآن</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>تم الدفع بنجاح</DialogTitle>
                        <DialogDescription>
                          تم تأكيد الحجز باستخدام Stripe Mock.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button onClick={handleBookingConfirm}>
                          عرض تفاصيل الطلب
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TabsContent>
                <TabsContent value="delivery" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">عنوان التوصيل</p>
                    <Select
                      value={selectedAddress}
                      onValueChange={setSelectedAddress}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر عنواناً محفوظاً" />
                      </SelectTrigger>
                      <SelectContent>
                        {addresses.map((address) => (
                          <SelectItem key={address.id} value={address.id}>
                            {address.label} - {address.city}
                          </SelectItem>
                        ))}
                        <SelectItem value="custom">عنوان جديد</SelectItem>
                      </SelectContent>
                    </Select>
                    {selectedAddress === "custom" && (
                      <>
                        <Input
                          list="address-suggestions"
                          placeholder="أدخل العنوان بالتفصيل"
                          value={customAddress}
                          onChange={(event) =>
                            setCustomAddress(event.target.value)
                          }
                        />
                        <datalist id="address-suggestions">
                          <option value="حي الياسمين - شارع أنس بن مالك" />
                          <option value="التجمع الخامس - شارع التسعين" />
                          <option value="الروشة - شارع الكورنيش" />
                        </datalist>
                      </>
                    )}
                    <p className="text-xs text-muted-foreground">
                      سيتم حفظ العنوان تلقائياً للاستخدام لاحقاً.
                    </p>
                  </div>
                  <div className="space-y-2 rounded-lg border p-4">
                    <p className="text-sm font-semibold">ملخص السلة</p>
                    {items.length === 0 ? (
                      <p className="text-xs text-muted-foreground">
                        لم تتم إضافة عناصر بعد.
                      </p>
                    ) : (
                      items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between text-xs"
                        >
                          <span>
                            {item.name} × {item.qty}
                          </span>
                          <span>{item.price * item.qty} SAR</span>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="rounded-lg border bg-muted/30 p-4 text-sm">
                    إجمالي السلة: <strong>{subtotal} SAR</strong>
                  </div>
                  <Button className="w-full" onClick={handleDeliveryCheckout}>
                    إتمام الطلب والتأكيد
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
