import { NextResponse } from "next/server";
import { products } from "@/lib/products";

export async function GET() {
  const normalizedProducts = products.map((product) => ({
    ...product,
    image: product.images[0] ?? "/product1.jpg",
  }));

  return NextResponse.json(normalizedProducts);
}