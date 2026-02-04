"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { HotelService } from "@/lib/types";

type HotelCardProps = {
  data: HotelService;
};

export function HotelCard({ data }: HotelCardProps) {
  return (
    <Link href={`/${data.city}/${data.service}/${data.id}`} className="group">
      <Card className="overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
        <div className="relative h-40 w-full">
          <Image
            src={data.image}
            alt={data.name}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-base font-semibold">{data.name}</p>
              <p className="text-xs text-muted-foreground">{data.hotelName}</p>
            </div>
            <Badge variant="secondary" className="text-xs">
              {data.priceRange}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{data.rating}</span>
            <span>•</span>
            <span>{data.tags.join(" • ")}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
