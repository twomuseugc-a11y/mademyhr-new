"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ✅ LOAD FROM LOCALSTORAGE ON START
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  // ✅ SAVE TO LOCALSTORAGE ON CHANGE
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ✅ ADD TO CART
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.fit === product.fit
      );

      if (existing) {
        if (existing.quantity >= 5) return prev;

        return prev.map((item) =>
          item === existing
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ✅ INCREASE
  const increaseQty = (index) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === index && item.quantity < 5
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // ✅ DECREASE
  const decreaseQty = (index) => {
    setCart((prev) =>
      prev
        .map((item, i) =>
          i === index
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ✅ REMOVE
  const removeItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ CLEAR CART (IMPORTANT FOR CHECKOUT)
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);