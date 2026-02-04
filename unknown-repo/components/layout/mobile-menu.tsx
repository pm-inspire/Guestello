"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { CitySelect } from "@/components/search/city-select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { mockServices } from "@/lib/data";

type MobileMenuProps = {
  city: string;
  onCityChange: (value: string) => void;
};

export function MobileMenu({ city, onCityChange }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>القائمة</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 py-6">
          <CitySelect
            value={city}
            onValueChange={onCityChange}
            placeholder="اختر مدينة"
          />
          <Separator />
          <div className="space-y-3">
            {mockServices.map((service) => (
              <Link
                key={service.id}
                href={`/${city}/${service.slug}`}
                className="block rounded-lg border px-4 py-3 text-sm font-medium"
              >
                {service.nameAr}
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
