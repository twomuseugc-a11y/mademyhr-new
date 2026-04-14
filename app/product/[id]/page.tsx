import Image from "next/image";

async function getProduct(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    return res.json();
  } catch {
    return null;
  }
}

export default async function ProductPage({ params }: any) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="p-20 text-center">
        Product not found
      </div>
    );
  }

  // ✅ SAFE IMAGE (no crash ever)
  const image =
    product?.image &&
    (product.image.startsWith("/") || product.image.startsWith("http"))
      ? product.image
      : "/product1.jpg";

  return (
    <main className="px-6 md:px-16 py-20 bg-[#f5efe6] min-h-screen">

      <div className="grid md:grid-cols-2 gap-16 items-center">

        {/* IMAGE */}
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
          <Image
            src={image}
            alt={product?.name || "product image"}   // ✅ FIXED
            fill
            className="object-cover"
            loading="eager"                          // ✅ performance
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl md:text-5xl font-light mb-4">
            {product?.name || "Product"}             {/* ✅ SAFE */}
          </h1>

          <p className="text-xl mb-6">
            ₹{product?.price || "—"}
          </p>

          <p className="text-[#4a4a4a] mb-8">
            {product?.description || "No description available."}
          </p>

          <button className="px-8 py-3 bg-black text-white rounded-full hover:opacity-90 transition">
            Add to Cart
          </button>
        </div>

      </div>

    </main>
  );
}