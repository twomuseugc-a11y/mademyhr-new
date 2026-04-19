"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp } from "@/components/animations/fadeUp";
import { hoverScale } from "@/components/animations/hoverScale";
import type { Product } from "@/features/products/product.types";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div variants={fadeUp} initial={false} animate="visible" {...hoverScale}>
      <Link
        href={`/product/${product.id}`}
        className="group block overflow-hidden rounded-[28px] border border-gray-200 bg-white transition-shadow hover:shadow-xl"
      >
        <div className="relative h-80 w-full overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            priority={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/5" />
        </div>

        <div className="space-y-3 p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Outfit {product.id}</p>
            <h3 className="mt-3 text-2xl font-semibold text-[#111111]">{product.name}</h3>
          </div>
          <p className="text-lg font-semibold text-[#111111]">₹{product.price}</p>
          <p className="text-sm leading-relaxed text-gray-600">{product.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
