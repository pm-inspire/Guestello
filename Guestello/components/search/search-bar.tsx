"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar({ placeholder = "ابحث عن فندق أو مطعم..." }: { placeholder?: string }) {
  return (
    <div className="relative w-full">
      <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pr-10"
        aria-label="بحث"
      />
    </div>
  );
}
