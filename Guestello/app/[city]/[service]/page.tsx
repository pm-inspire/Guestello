"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { HotelCard } from "@/components/cards/hotel-card";
import { CitySelect } from "@/components/search/city-select";
import { SearchBar } from "@/components/search/search-bar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockCities, mockServices } from "@/lib/data";
import { useHotels } from "@/hooks/use-hotels";

const priceRank: Record<string, number> = {
  SAR: 1,
  "SAR+": 2,
  "SAR++": 3,
  "SAR+++": 4,
  VIP: 5,
};

export default function ServiceListPage() {
  const params = useParams<{ city: string; service: string }>();
  const router = useRouter();
  const [sortBy, setSortBy] = useState("rating");

  const { data: hotels = [], isLoading } = useHotels();
  const services = mockServices;
  const selectedCity = params?.city ?? "riyadh";
  const selectedService = params?.service ?? "dining";
  const cityLabel =
    mockCities.find((city) => city.slug === selectedCity)?.nameAr ??
    selectedCity;
  const serviceLabel =
    services.find((service) => service.slug === selectedService)?.nameAr ??
    selectedService;

  const filtered = useMemo(() => {
    const items = hotels.filter(
      (hotel) =>
        hotel.city === selectedCity && hotel.service === selectedService
    );

    const sorted = [...items];
    if (sortBy === "rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === "price-low") {
      sorted.sort((a, b) => priceRank[a.priceRange] - priceRank[b.priceRange]);
    }
    if (sortBy === "price-high") {
      sorted.sort((a, b) => priceRank[b.priceRange] - priceRank[a.priceRange]);
    }
    return sorted;
  }, [selectedCity, selectedService, sortBy]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6">
      <div className="flex flex-col gap-6">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold">
            {serviceLabel} في {cityLabel}
          </h1>
          <p className="text-sm text-muted-foreground">
            اعثر على أفضل العروض والتقييمات في مدينتك.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_auto] lg:items-center">
          <CitySelect
            value={selectedCity}
            onValueChange={(value) =>
              router.push(`/${value}/${selectedService}`)
            }
          />
          <SearchBar placeholder="ابحث داخل الفنادق..." />
          <div className="flex items-center gap-3">
            <Select
              value={selectedService}
              onValueChange={(value) =>
                router.push(`/${selectedCity}/${value}`)
              }
            >
              <SelectTrigger className="min-w-[160px]">
                <SelectValue placeholder="نوع الخدمة" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.slug}>
                    {service.nameAr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="min-w-[160px]">
                <SelectValue placeholder="ترتيب حسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">الأعلى تقييماً</SelectItem>
                <SelectItem value="price-low">السعر الأقل</SelectItem>
                <SelectItem value="price-high">السعر الأعلى</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="h-56 rounded-xl border border-dashed"
                />
              ))
            : filtered.map((hotel) => (
                <HotelCard key={hotel.id} data={hotel} />
              ))}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
            لا توجد خدمات متاحة حالياً في هذه المدينة.
          </div>
        )}
      </div>
    </div>
  );
}
