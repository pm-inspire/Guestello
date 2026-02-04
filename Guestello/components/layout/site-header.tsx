"use client";

import Link from "next/link";
import { Hotel } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { CartSheet } from "@/components/cart/cart-sheet";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { NotificationsBell } from "@/components/layout/notifications-bell";
import { ProfileMenu } from "@/components/layout/profile-menu";
import { SearchBar } from "@/components/search/search-bar";
import { ServiceMenu } from "@/components/search/service-menu";
import { CitySelect } from "@/components/search/city-select";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [city, setCity] = useState("riyadh");
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Hotel className="h-5 w-5" />
            </div>
            <div className="hidden sm:block">
              <p className="text-lg font-bold">مضيف</p>
              <p className="text-xs text-muted-foreground">
                Hotel Services Marketplace
              </p>
            </div>
          </Link>
          <div className="hidden lg:flex items-center gap-3">
            <CitySelect value={city} onValueChange={setCity} />
            <div className="w-[240px]">
              <SearchBar />
            </div>
            <ServiceMenu city={city} />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NotificationsBell />
          <CartSheet />
          {session ? (
            <ProfileMenu />
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Button asChild variant="ghost">
                <Link href="/auth/login">تسجيل الدخول</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/register">حساب جديد</Link>
              </Button>
            </div>
          )}
          <MobileMenu city={city} onCityChange={setCity} />
        </div>
      </div>
    </header>
  );
}
