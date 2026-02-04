"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockCities } from "@/lib/data";

type CitySelectProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  navigateToService?: string;
};

export function CitySelect({
  value,
  onValueChange,
  placeholder = "اختر المدينة",
  navigateToService,
}: CitySelectProps) {
  const router = useRouter();
  const cities = useMemo(() => mockCities, []);

  const handleChange = (nextValue: string) => {
    onValueChange?.(nextValue);
    if (navigateToService) {
      router.push(`/${nextValue}/${navigateToService}`);
    }
  };

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="min-w-[160px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {cities.map((city) => (
          <SelectItem key={city.id} value={city.slug}>
            {city.nameAr}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
