"use client";

import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/components/providers/user-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const profileSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صحيح"),
  phone: z.string().min(8, "رقم الهاتف غير صحيح"),
});

type ProfileValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const {
    profile,
    addresses,
    orders,
    notifications,
    updateProfile,
    addAddress,
    removeAddress,
    markNotificationRead,
  } = useUser();
  const [tab, setTab] = useState("personal");
  const [newAddress, setNewAddress] = useState({
    label: "",
    city: "",
    street: "",
    details: "",
    phone: "",
  });

  const defaultValues = useMemo(
    () => ({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    }),
    [profile]
  );

  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash === "addresses") {
      setTab("addresses");
    }
    if (hash === "orders") {
      setTab("orders");
    }
    if (hash === "notifications") {
      setTab("notifications");
    }
  }, []);

  const handleProfileSave = (values: ProfileValues) => {
    updateProfile(values);
  };

  const handleAddAddress = () => {
    if (!newAddress.label || !newAddress.city) {
      return;
    }
    addAddress({
      id: `addr-${Date.now()}`,
      ...newAddress,
    });
    setNewAddress({ label: "", city: "", street: "", details: "", phone: "" });
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">الملف الشخصي</h1>
          <p className="text-sm text-muted-foreground">
            إدارة بياناتك وعناوينك والطلبات السابقة.
          </p>
        </div>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">البيانات الشخصية</TabsTrigger>
            <TabsTrigger value="addresses">العناوين</TabsTrigger>
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
            <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          </TabsList>
          <TabsContent value="personal" className="pt-6">
            <Card>
              <CardContent className="space-y-4 p-6">
                <Form {...form}>
                  <form
                    className="grid gap-4 md:grid-cols-2"
                    onSubmit={form.handleSubmit(handleProfileSave)}
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الاسم</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>البريد الإلكتروني</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رقم الهاتف</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-end">
                      <Button type="submit" className="w-full md:w-auto">
                        حفظ التغييرات
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="addresses" className="pt-6">
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-4">
                {addresses.map((address) => (
                  <Card key={address.id}>
                    <CardContent className="flex items-start justify-between gap-4 p-5">
                      <div>
                        <p className="text-sm font-semibold">{address.label}</p>
                        <p className="text-xs text-muted-foreground">
                          {address.city} - {address.street}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {address.details}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {address.phone}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => removeAddress(address.id)}
                      >
                        حذف
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card>
                <CardContent className="space-y-4 p-5">
                  <h3 className="text-sm font-semibold">إضافة عنوان جديد</h3>
                  <Input
                    placeholder="تسمية العنوان"
                    value={newAddress.label}
                    onChange={(event) =>
                      setNewAddress((prev) => ({
                        ...prev,
                        label: event.target.value,
                      }))
                    }
                  />
                  <Input
                    placeholder="المدينة"
                    value={newAddress.city}
                    onChange={(event) =>
                      setNewAddress((prev) => ({
                        ...prev,
                        city: event.target.value,
                      }))
                    }
                  />
                  <Input
                    placeholder="الشارع"
                    value={newAddress.street}
                    onChange={(event) =>
                      setNewAddress((prev) => ({
                        ...prev,
                        street: event.target.value,
                      }))
                    }
                  />
                  <Input
                    placeholder="تفاصيل إضافية"
                    value={newAddress.details}
                    onChange={(event) =>
                      setNewAddress((prev) => ({
                        ...prev,
                        details: event.target.value,
                      }))
                    }
                  />
                  <Input
                    placeholder="رقم الهاتف"
                    value={newAddress.phone}
                    onChange={(event) =>
                      setNewAddress((prev) => ({
                        ...prev,
                        phone: event.target.value,
                      }))
                    }
                  />
                  <Button onClick={handleAddAddress}>إضافة العنوان</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="orders" className="pt-6">
            <div className="grid gap-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="flex flex-wrap items-center justify-between gap-4 p-5">
                    <div>
                      <p className="text-sm font-semibold">{order.serviceName}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.hotelName} • {order.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          order.status === "Confirmed"
                            ? "default"
                            : order.status === "Pending"
                            ? "secondary"
                            : order.status === "Delivered"
                            ? "outline"
                            : "destructive"
                        }
                      >
                        {order.status}
                      </Badge>
                      <span className="text-sm font-semibold">
                        {order.total} SAR
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="notifications" className="pt-6">
            <div className="space-y-4">
              {notifications.map((notif) => (
                <Card key={notif.id}>
                  <CardContent className="flex items-start justify-between gap-4 p-5">
                    <div>
                      <p className="text-sm font-semibold">{notif.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {notif.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {notif.time}
                      </p>
                    </div>
                    {!notif.read && (
                      <Button
                        variant="outline"
                        onClick={() => markNotificationRead(notif.id)}
                      >
                        وضع كمقروء
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
