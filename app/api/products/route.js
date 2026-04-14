import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const product = await Product.create(body);

    return Response.json(product);
  } catch (err) {
    return Response.json({ error: err.message });
  }
}

export async function GET() {
  await connectDB();
  const products = await Product.find();

  return Response.json(products);
}