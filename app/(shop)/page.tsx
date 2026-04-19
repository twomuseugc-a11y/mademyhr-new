"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLayoutEffect, useEffect, useState } from "react";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";
import { useProducts } from "@/hooks/useProducts";

export default function Home() {
  const products = useProducts();
  const heroProducts = products.slice(0, 3);
  const prefersReducedMotion = useReducedMotion();
  const rotatingLines = [
    "Made for you",
    "Created after you order",
    "Not sitting in inventory",
  ];
  const imagePositions = ["object-center", "object-top", "object-[50%_32%]"];
  const [activeLine, setActiveLine] = useState(0);
  const [glowPosition, setGlowPosition] = useState({ x: 320, y: 220 });
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || prefersReducedMotion) return;

    const timer = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % rotatingLines.length);
    }, 2400);

    return () => clearInterval(timer);
  }, [mounted, prefersReducedMotion, rotatingLines.length]);

  return (
    <main className="bg-[#f5efe6] text-[#1a1a1a]">
      <section
        className="relative overflow-hidden py-14 md:py-20"
        onMouseMove={(event) => {
          if (!mounted || prefersReducedMotion) return;

          const sectionBounds = event.currentTarget.getBoundingClientRect();
          setGlowPosition({
            x: event.clientX - sectionBounds.left,
            y: event.clientY - sectionBounds.top,
          });
        }}
      >
        <div className="absolute w-[580px] h-[580px] bg-[#e8dfd3] rounded-full blur-3xl opacity-45 top-[-200px] left-[-160px]" />
        <div className="absolute w-[560px] h-[560px] bg-[#dfd3c2] rounded-full blur-3xl opacity-40 bottom-[-220px] right-[-180px]" />
        {mounted && !prefersReducedMotion && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute hidden md:block w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.52)_0%,rgba(255,255,255,0)_70%)]"
            animate={{ x: glowPosition.x - 150, y: glowPosition.y - 150 }}
            transition={{ type: "spring", damping: 30, stiffness: 120, mass: 0.6 }}
          />
        )}

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-[1.08fr_0.92fr] gap-10 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <p className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-[#7a6855] mb-5">
                Not mass produced
              </p>

              <h1 className="font-['Iowan_Old_Style','Book_Antiqua','Palatino_Linotype',serif] text-4xl md:text-6xl lg:text-7xl font-light leading-[1.04] tracking-[-0.02em] text-[#17130f]">
                Made only when
                <br />
                you choose it
              </h1>

              <p className="mt-6 max-w-xl text-sm md:text-base leading-relaxed text-[#4d443a]">
                Every piece is created after you order - designed to feel personal, not produced.
              </p>

              <div className="h-8 mt-4 text-sm text-[#6f5a44]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={rotatingLines[activeLine]}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="italic"
                  >
                    {rotatingLines[activeLine]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#collection"
                  className="px-8 py-3 bg-[#111111] text-white rounded-full text-xs md:text-sm tracking-[0.16em] uppercase hover:opacity-90 transition shadow-[0_10px_24px_rgba(0,0,0,0.15)]"
                >
                  Explore Collection
                </Link>
                <Link
                  href="#how-it-works"
                  className="px-8 py-3 border border-[#2a241d]/20 text-[#1c1713] rounded-full text-xs md:text-sm tracking-[0.16em] uppercase bg-white/70 hover:bg-white transition"
                >
                  How It Works
                </Link>
              </div>

              <p className="mt-6 text-xs md:text-sm tracking-[0.03em] text-[#635647]">
                No warehouses. No overproduction. Just your piece.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#7c6a58]">Selected Outfits</p>
                <Link
                  href="#collection"
                  className="text-[11px] uppercase tracking-[0.18em] text-[#1f1a15] underline underline-offset-4 hover:opacity-70 transition"
                >
                  Explore all outfits
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-5">
                {heroProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className={`group rounded-3xl bg-white/95 border border-[#e5ddd2] shadow-[0_10px_35px_rgba(17,17,17,0.08)] hover:shadow-[0_18px_45px_rgba(17,17,17,0.15)] overflow-hidden ${
                      index === 2 ? "col-span-2 md:col-span-1" : ""
                    }`}
                  >
                    <Link href={`/product/${product.id}`} className="block">
                      <div className="relative h-56 md:h-64">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className={`object-cover ${imagePositions[index] ?? "object-center"}`}
                          priority={index < 2}
                        />
                        <span className="absolute top-3 left-3 rounded-full bg-black/80 text-white px-3 py-1 text-[10px] uppercase tracking-[0.18em]">
                          Made for you
                        </span>
                      </div>
                      <div className="p-4 md:p-5">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#847261]">Outfit {product.id}</p>
                        <h3 className="mt-2 text-lg font-medium text-[#1a1511]">{product.name}</h3>
                        <p className="mt-2 text-sm text-[#4f4337]">₹{product.price}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="collection" className="px-6 md:px-12 py-24">
        <h2 className="text-3xl md:text-4xl text-center mb-14 font-light tracking-wide">Our Collection</h2>
        <ProductGrid products={products} className="md:grid-cols-3 xl:grid-cols-3" />
      </section>

      <div className="border-t border-gray-200 mx-6 md:mx-12" />

      <section id="how-it-works" className="px-6 md:px-16 py-24 bg-[#efe7dc]">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wide">How It Works</h2>
          <p className="text-sm md:text-base text-[#4d443a]">Your piece is made only when you decide. No inventory. No compromise.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="text-2xl">🎀</div>
            <h3 className="font-medium text-[#1a1511]">You Choose</h3>
            <p className="text-sm text-[#4d443a] max-w-[200px]">Browse and select the piece that speaks to you.</p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="text-2xl">🧵</div>
            <h3 className="font-medium text-[#1a1511]">We Create</h3>
            <p className="text-sm text-[#4d443a] max-w-[200px]">We craft your piece from scratch—only after you order.</p>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div className="text-2xl">🌿</div>
            <h3 className="font-medium text-[#1a1511]">It Arrives</h3>
            <p className="text-sm text-[#4d443a] max-w-[200px]">Your made-for-you piece arrives, ready to be worn and loved.</p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-16 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative w-full h-[420px] rounded-3xl overflow-hidden">
            <Image
              src="/story.jpg"
              alt="story"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="eager"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-light mb-6">Our Story</h2>
            <div className="space-y-4 text-sm text-[#4a4a4a] leading-relaxed">
              <p>madebyhr began with two best friends who believed clothing should feel more personal.</p>
              <p>In a world of fast fashion, we chose to slow things down — creating pieces that are made only when you choose them.</p>
              <p>When something is designed and tailored for you, the feeling is different — more intentional, more personal, more yours.</p>
              <p className="italic text-[#1a1a1a]">madebyhr is about that feeling — effortless, premium, and quietly confident.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
