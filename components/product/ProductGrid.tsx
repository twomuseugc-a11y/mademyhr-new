"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/product/ProductCard";
import { stagger } from "@/components/animations/stagger";
import type { Product } from "@/features/products/product.types";

type ProductGridProps = {
  products: Product[];
  className?: string;
};

export default function ProductGrid({ products, className = "" }: ProductGridProps) {
  return (
    <motion.div
      className={`grid gap-8 md:grid-cols-2 xl:grid-cols-3 ${className}`}
      variants={stagger}
      initial={false}
      animate="visible"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </motion.div>
  );
}
