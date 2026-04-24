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
  const useUnoptimizedImage = process.env.NODE_ENV !== "production";

  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} {...hoverScale}>
      <Link
        href={`/product/${product.id}`}
        className="group block overflow-hidden rounded-[28px] border border-gray-200/90 bg-white shadow-[0_12px_30px_rgba(17,17,17,0.06)] transition-shadow hover:shadow-[0_28px_60px_rgba(17,17,17,0.16)]"
      >
        <div className="relative h-80 w-full overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            unoptimized={useUnoptimizedImage}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition duration-300 ease-out group-hover:scale-[1.05] group-hover:brightness-[1.02]"
            priority={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-black/0 to-black/0 opacity-0 transition duration-300 group-hover:opacity-100" />
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-end p-5 opacity-0 transition duration-300 group-hover:opacity-100"
            initial={false}
            animate={{ y: 0 }}
          >
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur-md">
              Made for you
            </span>
          </motion.div>
        </div>

        <div className="space-y-3 p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500">Outfit {product.id}</p>
            <h3 className="mt-3 text-2xl font-semibold text-[#111111] transition-transform duration-300 group-hover:-translate-y-1">
              {product.name}
            </h3>
          </div>
          <p className="text-lg font-semibold text-[#111111] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:opacity-95">₹{product.price}</p>
          <p className="text-sm leading-relaxed text-gray-600">{product.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}
