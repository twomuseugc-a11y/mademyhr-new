import { products } from "@/lib/products";
import type { Product } from "./product.types";

export function getCatalogProducts(): Product[] {
  return products as Product[];
}

export function getProductById(id: string): Product | undefined {
  return getCatalogProducts().find((product) => product.id === id);
}
