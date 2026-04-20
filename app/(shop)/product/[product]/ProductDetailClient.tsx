"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/features/cart/cart.context";
import type { Product } from "@/features/products/product.types";

export default function ProductDetailClient({ product }: { product: Product }) {
  const useUnoptimizedImage = process.env.NODE_ENV !== "production";
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedFit, setSelectedFit] = useState("Regular");
  const [customMeasurements, setCustomMeasurements] = useState("");
  const [openPanel, setOpenPanel] = useState<"details" | "care" | "delivery" | null>("details");

  const handleAddToCart = () => {
    if (selectedSize === "Custom" && !customMeasurements.trim()) {
      alert("Please enter your measurements for Custom size.");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      customMeasurements: selectedSize === "Custom" ? customMeasurements.trim() : "",
      fit: selectedFit,
      quantity: 1,
    });

    router.push("/cart");
  };

  return (
    <main className="px-6 md:px-16 py-20 bg-[#f5efe6] min-h-screen">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
        <div className="flex gap-5">
          <div className="flex flex-col gap-4">
            {product.images.map((src, index) => (
              <button
                key={src}
                type="button"
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-24 rounded-2xl overflow-hidden border transition hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.99] ${
                  selectedImage === index ? "border-black" : "border-gray-200"
                }`}
              >
                <Image
                  src={src}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  fill
                  unoptimized={useUnoptimizedImage}
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>

          <div className="relative w-full h-[560px] rounded-[32px] overflow-hidden border border-gray-200 shadow-[0_18px_42px_rgba(17,17,17,0.08)]">
            <Image
              src={product.images[selectedImage]}
              alt={`${product.name} image ${selectedImage + 1}`}
              fill
              unoptimized={useUnoptimizedImage}
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="eager"
              className="object-cover transition duration-700 ease-out hover:scale-[1.02]"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-light text-[#111111] mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold text-[#111111] mb-4">₹{product.price}</p>
            <p className="text-[#4a4a4a] leading-[1.72]">{product.description}</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">Size</h2>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-3 rounded-full border text-sm transition hover:-translate-y-0.5 active:scale-[0.99] ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {selectedSize === "Custom" && (
                <textarea
                  value={customMeasurements}
                  onChange={(event) => setCustomMeasurements(event.target.value)}
                  placeholder="Enter your measurements (bust, waist, length...)"
                  className="w-full min-h-[140px] rounded-2xl border border-gray-300 px-4 py-3 text-sm text-gray-700 focus:border-black focus:outline-none"
                />
              )}
            </div>

            <div className="space-y-3">
              <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">Fit</h2>
              <div className="flex gap-3">
                {product.fit.map((fitOption) => (
                  <button
                    key={fitOption}
                    type="button"
                    onClick={() => setSelectedFit(fitOption)}
                    className={`px-5 py-3 rounded-full border text-sm transition hover:-translate-y-0.5 active:scale-[0.99] ${
                      selectedFit === fitOption
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:border-black"
                    }`}
                  >
                    {fitOption}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full rounded-full border border-black/5 bg-[#111111] py-4 text-sm font-semibold tracking-wide text-white shadow-[0_12px_28px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5 hover:bg-[#1b1b1b] hover:shadow-[0_18px_34px_rgba(0,0,0,0.2)] active:scale-[0.99]"
            >
              Add to Cart
            </button>

            <p className="text-sm text-gray-500">Your custom size note is saved with the cart item and sent during checkout.</p>

            {(product.details?.length || product.care?.length || product.delivery) && (
              <div className="space-y-3 border-t border-gray-200 pt-6">
                {product.details?.length ? (
                  <div className="rounded-2xl border border-[#ded6cc] bg-white/80 shadow-[0_10px_24px_rgba(17,17,17,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(17,17,17,0.08)]">
                    <button
                      type="button"
                      onClick={() => setOpenPanel((prev) => (prev === "details" ? null : "details"))}
                      className="w-full px-5 py-4 flex items-center justify-between text-left"
                    >
                      <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#615443]">Product Details</h3>
                      <span className={`text-xl leading-none text-[#615443] transition-transform ${openPanel === "details" ? "rotate-45" : ""}`}>+</span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openPanel === "details" ? "max-h-60 pb-4 px-5" : "max-h-0 px-5"}`}>
                      <ul className="space-y-2 text-sm text-[#4a4a4a] leading-relaxed">
                        {product.details.map((detail) => (
                          <li key={detail}>• {detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}

                {product.care?.length ? (
                  <div className="rounded-2xl border border-[#ded6cc] bg-white/80 shadow-[0_10px_24px_rgba(17,17,17,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(17,17,17,0.08)]">
                    <button
                      type="button"
                      onClick={() => setOpenPanel((prev) => (prev === "care" ? null : "care"))}
                      className="w-full px-5 py-4 flex items-center justify-between text-left"
                    >
                      <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#615443]">Care</h3>
                      <span className={`text-xl leading-none text-[#615443] transition-transform ${openPanel === "care" ? "rotate-45" : ""}`}>+</span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openPanel === "care" ? "max-h-60 pb-4 px-5" : "max-h-0 px-5"}`}>
                      <ul className="space-y-2 text-sm text-[#4a4a4a] leading-relaxed">
                        {product.care.map((careItem) => (
                          <li key={careItem}>• {careItem}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : null}

                {product.delivery ? (
                  <div className="rounded-2xl border border-[#ded6cc] bg-white/80 shadow-[0_10px_24px_rgba(17,17,17,0.05)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_30px_rgba(17,17,17,0.08)]">
                    <button
                      type="button"
                      onClick={() => setOpenPanel((prev) => (prev === "delivery" ? null : "delivery"))}
                      className="w-full px-5 py-4 flex items-center justify-between text-left"
                    >
                      <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[#615443]">Delivery</h3>
                      <span className={`text-xl leading-none text-[#615443] transition-transform ${openPanel === "delivery" ? "rotate-45" : ""}`}>+</span>
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openPanel === "delivery" ? "max-h-40 pb-4 px-5" : "max-h-0 px-5"}`}>
                      <p className="text-sm text-[#4a4a4a] leading-relaxed">{product.delivery}</p>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
