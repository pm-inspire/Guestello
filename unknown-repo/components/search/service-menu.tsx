"use client";

import Link from "next/link";
import { Hotel, Sparkles, Utensils, Waves } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { mockServices } from "@/lib/data";

const iconMap = {
  spa: Sparkles,
  dining: Utensils,
  activities: Waves,
  hotels: Hotel,
};

export function ServiceMenu({ city }: { city: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="gap-2">
          الخدمات
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {mockServices.map((service) => {
          const Icon = iconMap[service.slug];
          return (
            <DropdownMenuItem key={service.id} asChild>
              <Link href={`/${city}/${service.slug}`} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-primary" />
                <span>{service.nameAr}</span>
              </Link>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
