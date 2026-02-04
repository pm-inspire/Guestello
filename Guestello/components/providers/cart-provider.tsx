"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import type { CartItem } from "@/lib/types";
import { useLocalStorage } from "@/hooks/use-local-storage";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>("hsmp_cart", []);

  const addItem = useCallback(
    (item: CartItem) => {
      setItems((prev) => {
        const existing = prev.find((entry) => entry.id === item.id);
        if (existing) {
          return prev.map((entry) =>
            entry.id === item.id
              ? { ...entry, qty: entry.qty + item.qty }
              : entry
          );
        }
        return [item, ...prev];
      });
    },
    [setItems]
  );

  const removeItem = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    },
    [setItems]
  );

  const updateQty = useCallback(
    (id: string, qty: number) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, qty } : item))
      );
    },
    [setItems]
  );

  const clear = useCallback(() => {
    setItems([]);
  }, [setItems]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [items]
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQty,
      clear,
      subtotal,
      itemCount,
    }),
    [addItem, clear, items, itemCount, removeItem, subtotal, updateQty]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
