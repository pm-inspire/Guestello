"use client";

import { useUser } from "@/components/providers/user-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead } =
    useUser();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 lg:px-6">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">الإشعارات</h1>
            <p className="text-sm text-muted-foreground">
              تابع آخر التحديثات الخاصة بحجوزاتك.
            </p>
          </div>
          <Button variant="outline" onClick={markAllNotificationsRead}>
            وضع الكل كمقروء
          </Button>
        </div>
        <div className="space-y-4">
          {notifications.map((notif) => (
            <Card key={notif.id}>
              <CardContent className="flex items-start justify-between gap-4 p-5">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{notif.title}</p>
                    {!notif.read && <Badge>جديد</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {notif.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notif.time}
                  </p>
                </div>
                {!notif.read && (
                  <Button
                    variant="ghost"
                    onClick={() => markNotificationRead(notif.id)}
                  >
                    تعليم كمقروء
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
