import { NextResponse } from "next/server";
import { getCatalogProducts } from "@/features/products/product.service";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const normalizedProducts = getCatalogProducts().map((product) => ({
    ...product,
    image: product.images[0] ?? "/product1.jpg",
  }));

  return NextResponse.json(normalizedProducts, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}