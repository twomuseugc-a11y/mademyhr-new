import ProductGrid from "@/components/product/ProductGrid";
import { getCatalogProducts } from "@/features/products/product.service";

export default function ProductPage() {
  const products = getCatalogProducts();

  return (
    <main className="px-6 md:px-16 py-20 bg-[#f5efe6] min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-light text-[#111111]">All Outfits</h1>
          <p className="mt-3 text-gray-600 max-w-2xl">
            Browse all 12 outfits, choose your size, and customize your fit.
          </p>
        </div>

        <ProductGrid products={products} />
      </div>
    </main>
  );
}
