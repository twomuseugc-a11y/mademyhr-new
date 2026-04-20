"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/features/products/product.types";
import { getCatalogProducts } from "@/features/products/product.service";

let cachedProducts: Product[] | null = null;
let lastFetchedAt = 0;
let inflightRequest: Promise<Product[] | null> | null = null;
const CACHE_TTL_MS = 60_000;

async function fetchProductsOnce() {
  const now = Date.now();

  if (cachedProducts && now - lastFetchedAt < CACHE_TTL_MS) {
    return cachedProducts;
  }

  if (inflightRequest) {
    return inflightRequest;
  }

  inflightRequest = (async () => {
    try {
      const response = await fetch("/api/products", { cache: "no-store" });
      if (!response.ok) {
        return cachedProducts;
      }

      const data = (await response.json()) as Product[];
      if (Array.isArray(data) && data.length > 0) {
        cachedProducts = data;
        lastFetchedAt = Date.now();
        return data;
      }

      return cachedProducts;
    } catch {
      return cachedProducts;
    } finally {
      inflightRequest = null;
    }
  })();

  return inflightRequest;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(() => cachedProducts ?? getCatalogProducts());

  useEffect(() => {
    let isActive = true;

    async function loadProducts() {
      const data = await fetchProductsOnce();
      if (isActive && data && data.length > 0) {
        setProducts(data);
      }
    }

    void loadProducts();
    return () => {
      isActive = false;
    };
  }, []);

  return products;
}
