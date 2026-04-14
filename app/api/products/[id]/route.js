import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const product = await Product.findById(params.id);

    if (!product) {
      return Response.json({ error: "Not found" });
    }

    return Response.json(product);
  } catch (err) {
    return Response.json({ error: err.message });
  }
}