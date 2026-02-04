"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useUser } from "@/components/providers/user-provider";
import { Button } from "@/components/ui/button";

export function NotificationsBell() {
  const { unreadCount } = useUser();

  return (
    <Button asChild variant="ghost" size="icon" className="relative">
      <Link href="/notifications" aria-label="الإشعارات">
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
            {unreadCount}
          </span>
        )}
      </Link>
    </Button>
  );
}
