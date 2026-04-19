"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/features/products/product.types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let isActive = true;

    async function loadProducts() {
      try {
        const response = await fetch("/api/products", { cache: "no-store" });
        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as Product[];
        if (isActive) {
          setProducts(data);
        }
      } catch {
        // Keep existing state when the API is temporarily unavailable.
      }
    }

    void loadProducts();
    return () => {
      isActive = false;
    };
  }, []);

  return products;
}
