import { getCatalogProducts, getProductById } from "@/features/products/product.service";
import ProductDetailClient from "./ProductDetailClient";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ProductPageProps = {
  params: Promise<{
    product?: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  noStore();
  const resolvedParams = await params;
  const requestedId = resolvedParams?.product ? String(resolvedParams.product) : "";
  const product = getProductById(requestedId);
  const products = getCatalogProducts();

  if (!product) {
    return (
      <main className="min-h-screen bg-[#f5efe6] px-6 py-20 text-[#1a1a1a]">
        <div className="mx-auto max-w-3xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-3xl font-semibold mb-4">Product not found</h1>
          <p className="text-sm text-gray-600 mb-6">
            Requested product id: <span className="font-medium text-[#111111]">{requestedId || "(missing)"}</span>
          </p>
          <p className="text-sm text-gray-600 mb-4">Available product ids:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {products.map((item) => (
              <span key={item.id} className="rounded-full border border-gray-200 bg-[#f7f5f1] px-3 py-1 text-sm text-[#4a4a4a]">
                {item.id}
              </span>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return <ProductDetailClient product={product} />;
}
