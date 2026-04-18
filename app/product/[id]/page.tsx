import Image from "next/image";

const products = [
  {
    id: "1",
    name: "Linen Wrap Dress",
    price: 4200,
    image: "/product1.jpg",
    description: "Soft breathable linen, made just for you.",
  },
  {
    id: "2",
    name: "Cozy Knit Sweater",
    price: 2800,
    image: "/product2.jpg",
    description: "Warm, cozy, and perfect for everyday wear.",
  },
];

export default async function ProductPage({ params }: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="p-20 text-center">
        Product not found
      </div>
    );
  }

  return (
    <main className="px-6 md:px-16 py-20 bg-[#f5efe6] min-h-screen">

      <div className="grid md:grid-cols-2 gap-16 items-center">

        {/* IMAGE */}
        <div className="relative w-full h-[500px] rounded-2xl overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl md:text-5xl font-light mb-4">
            {product.name}
          </h1>

          <p className="text-xl mb-6">
            ₹{product.price}
          </p>

          <p className="text-[#4a4a4a] mb-8">
            {product.description}
          </p>

          <button className="px-8 py-3 bg-black text-white rounded-full hover:opacity-90 transition">
            Add to Cart
          </button>
        </div>

      </div>

    </main>
  );
}