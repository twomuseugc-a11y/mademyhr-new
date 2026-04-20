"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/features/products/product.types";

type ProductGridProps = {
  products: Product[];
  className?: string;
};

export default function ProductGrid({ products, className = "" }: ProductGridProps) {
  return (
    <motion.div
      className={`grid gap-10 md:grid-cols-2 xl:grid-cols-3 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
}
