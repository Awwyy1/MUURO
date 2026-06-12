"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { unitPrice } from "./pricing";

export interface CartItem {
  slug: string;
  sizeId: string;
  frameId: string;
  lightId: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  hydrated: boolean;
  addItem: (item: Omit<CartItem, "qty">) => void;
  updateQty: (index: number, qty: number) => void;
  removeItem: (index: number) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "muuro:cart:v1";

function sameConfig(a: CartItem, b: Omit<CartItem, "qty">) {
  return (
    a.slug === b.slug &&
    a.sizeId === b.sizeId &&
    a.frameId === b.frameId &&
    a.lightId === b.lightId
  );
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* corrupted storage, start clean */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartItem, "qty">) => {
    setItems((prev) => {
      const existing = prev.findIndex((i) => sameConfig(i, item));
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = { ...next[existing], qty: next[existing].qty + 1 };
        return next;
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setIsOpen(true);
  }, []);

  const updateQty = useCallback((index: number, qty: number) => {
    setItems((prev) =>
      qty < 1
        ? prev.filter((_, i) => i !== index)
        : prev.map((item, i) => (i === index ? { ...item, qty } : item))
    );
  }, []);

  const removeItem = useCallback((index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const item of items) {
      try {
        subtotal +=
          unitPrice(item.slug, item.sizeId, item.frameId, item.lightId) *
          item.qty;
        count += item.qty;
      } catch {
        /* stale item for a removed edition, ignored in totals */
      }
    }
    return { count, subtotal };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      isOpen,
      hydrated,
      addItem,
      updateQty,
      removeItem,
      clear,
      openCart,
      closeCart,
    }),
    [items, count, subtotal, isOpen, hydrated, addItem, updateQty, removeItem, clear, openCart, closeCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
