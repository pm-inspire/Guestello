"use client";

import Link from "next/link";
import { Hotel, Sparkles, Utensils, Waves } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { ServiceCategory } from "@/lib/types";

const iconMap = {
  spa: Sparkles,
  dining: Utensils,
  activities: Waves,
  hotels: Hotel,
};

type ServiceCategoryCardProps = {
  service: ServiceCategory;
  city: string;
};

export function ServiceCategoryCard({ service, city }: ServiceCategoryCardProps) {
  const Icon = iconMap[service.slug];

  return (
    <Link href={`/${city}/${service.slug}`} className="group">
      <Card className="transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
        <CardContent className="space-y-3 p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <p className="text-base font-semibold">{service.nameAr}</p>
            <p className="text-xs text-muted-foreground">
              {service.descriptionAr}
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
