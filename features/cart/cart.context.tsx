"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  fit: string;
  customMeasurements?: string;
  quantity: number;
};

type CartContextValue = {
  cart: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  increaseQty: (index: number) => void;
  decreaseQty: (index: number) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) {
        setCart(JSON.parse(stored) as CartItem[]);
      }
    } catch {
      setCart([]);
    } finally {
      setHasHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hasHydrated) return;
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, hasHydrated]);

  const addToCart = (product: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.fit === product.fit &&
          item.customMeasurements === product.customMeasurements
      );

      if (existing) {
        if (existing.quantity >= 5) return prev;
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [...prev, { ...product, quantity: product.quantity ?? 1 }];
    });
  };

  const increaseQty = (index: number) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === index && item.quantity < 5 ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (index: number) => {
    setCart((prev) =>
      prev
        .map((item, i) => (i === index ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const value = useMemo(
    () => ({ cart, addToCart, increaseQty, decreaseQty, removeItem, clearCart }),
    [cart]
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
