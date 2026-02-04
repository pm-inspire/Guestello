"use client";

import { useQuery } from "@tanstack/react-query";
import { mockHotels } from "@/lib/data";
import type { HotelService } from "@/lib/types";

export function useHotels() {
  return useQuery<HotelService[]>({
    queryKey: ["hotels"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return mockHotels;
    },
  });
}
