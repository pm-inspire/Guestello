"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const stored = window.localStorage.getItem(key);
      if (stored) {
        setValue(JSON.parse(stored) as T);
      }
    } catch (error) {
      console.error("Failed to read localStorage", error);
    } finally {
      setIsLoaded(true);
    }
  }, [key]);

  useEffect(() => {
    if (!isLoaded || typeof window === "undefined") {
      return;
    }
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Failed to write localStorage", error);
    }
  }, [isLoaded, key, value]);

  return [value, setValue, isLoaded] as const;
}
