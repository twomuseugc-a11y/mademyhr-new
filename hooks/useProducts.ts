import { useMemo } from "react";
import { getCatalogProducts } from "@/features/products/product.service";

export function useProducts() {
  return useMemo(() => getCatalogProducts(), []);
}
