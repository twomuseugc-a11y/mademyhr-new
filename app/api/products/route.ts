import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({});

    const blockedNames = ["corsety", "corset", "cordsety", "cordset", "cordsety"];
    const cleanedProducts = products
      .filter((product) => {
        const name = String(product.name || "").toLowerCase();
        return !blockedNames.some((blocked) => name.includes(blocked));
      })
      .map((product) => ({
        ...product.toObject(),
        image:
          product.image && !product.image.includes('cloudinary.com')
            ? product.image
            : '/product1.jpg', // fallback to local image
      }));

    return NextResponse.json(cleanedProducts);
  } catch (error) {
    console.error("GET PRODUCTS ERROR:", error);

    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}