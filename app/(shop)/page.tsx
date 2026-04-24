"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import ProductGrid from "@/components/product/ProductGrid";
import Footer from "@/components/layout/Footer";
import { useProducts } from "@/hooks/useProducts";

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="m6.5 7.5 5.5 4 5.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <path
        d="M20 11.8a7.8 7.8 0 0 1-11.66 6.75L4 19l1.5-4.05A7.8 7.8 0 1 1 20 11.8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9.6 8.9c.2-.4.4-.4.6-.4h.5c.2 0 .4.1.5.4l.8 1.7c.1.2.1.4 0 .6l-.4.5c-.1.2-.1.4 0 .6.4.8 1.1 1.5 1.9 1.9.2.1.4.1.6 0l.5-.4c.2-.1.4-.1.6 0l1.7.8c.3.1.4.3.4.5v.5c0 .2 0 .4-.4.6-.4.3-1 .6-1.8.6-1.8 0-3.7-.8-5.2-2.3S7.3 11.8 7.3 10c0-.8.3-1.4.6-1.8Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-4 w-4">
      <rect x="5" y="5" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16.7" cy="7.3" r="0.9" fill="currentColor" />
    </svg>
  );
}

export default function Home() {
  const products = useProducts();
  const heroProducts = products.slice(0, 3);
  const storyLines = [
    "We make each piece only after you choose it, so every order feels personal, calm, and considered.",
    "Nothing sits waiting in a warehouse. It is created for you, with care, and finished to feel quietly premium.",
  ];
  const imagePositions = ["object-center", "object-top", "object-[50%_32%]"];

  const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.26,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <main className="bg-[#f5efe6] text-[#1a1a1a]">
      <section className="relative overflow-hidden py-14 md:py-20">
        <motion.div
          aria-hidden="true"
          className="absolute h-[580px] w-[580px] rounded-full bg-[#e8dfd3] opacity-40 top-[-200px] left-[-160px]"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute h-[560px] w-[560px] rounded-full bg-[#dfd3c2] opacity-35 bottom-[-220px] right-[-180px]"
          animate={{ scale: [1.02, 1, 1.04] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute hidden md:block top-1/2 left-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0)_70%)]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid md:grid-cols-[1.08fr_0.92fr] gap-10 md:gap-12 items-center">
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="text-[11px] md:text-xs uppercase tracking-[0.28em] text-[#7a6855] mb-5">
                Not mass produced
              </p>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
                className="font-['Iowan_Old_Style','Book_Antiqua','Palatino_Linotype',serif] text-4xl md:text-6xl lg:text-7xl font-light leading-[1.04] tracking-[-0.02em] text-[#17130f]"
              >
                Made only when
                <br />
                you choose it
              </motion.h1>

              <p className="mt-6 max-w-xl text-sm md:text-base leading-[1.72] text-[#4d443a]">
                Every piece is created after you order - designed to feel personal, not produced.
              </p>

              <div className="h-8 mt-4 text-sm text-[#6f5a44]">
                <p className="italic">Made for you, after you order.</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#collection"
                  className="rounded-full border border-black/5 bg-black px-8 py-3 text-xs uppercase tracking-[0.16em] text-white shadow-[0_12px_28px_rgba(0,0,0,0.15)] transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#1b1b1b] hover:shadow-[0_18px_34px_rgba(0,0,0,0.22)] active:scale-[0.97]"
                >
                  Explore Collection
                </Link>
                <Link
                  href="#how-it-works"
                  className="rounded-full border border-[#2a241d]/18 bg-white/70 px-8 py-3 text-xs uppercase tracking-[0.16em] text-[#1c1713] transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-white hover:shadow-[0_14px_28px_rgba(17,17,17,0.08)] active:scale-[0.97]"
                >
                  How It Works
                </Link>
              </div>

              <p className="mt-6 text-xs md:text-sm tracking-[0.03em] text-[#635647]">
                No warehouses. No overproduction. Just your piece.
              </p>
            </motion.div>

            <motion.div variants={sectionVariants} initial="hidden" animate="visible">
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
                    whileHover={{ scale: 1.045, y: -8 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`group rounded-3xl bg-white/95 border border-[#e5ddd2] shadow-[0_10px_35px_rgba(17,17,17,0.08)] hover:shadow-[0_22px_50px_rgba(17,17,17,0.16)] overflow-hidden ${
                      index === 2 ? "col-span-2 md:col-span-1" : ""
                    }`}
                  >
                    <Link href={`/product/${product.id}`} className="block">
                      <div className="relative h-56 overflow-hidden md:h-64">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className={`object-cover transition duration-700 ease-out group-hover:scale-110 ${imagePositions[index] ?? "object-center"}`}
                          priority={index < 2}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/18 via-black/0 to-black/0 opacity-0 transition duration-300 group-hover:opacity-100" />
                        <span className="absolute top-3 left-3 rounded-full bg-black/80 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white shadow-[0_8px_18px_rgba(0,0,0,0.14)] backdrop-blur-sm">
                          Made for you
                        </span>
                      </div>
                      <div className="p-4 md:p-5">
                        <p className="text-[11px] uppercase tracking-[0.24em] text-[#847261]">Outfit {product.id}</p>
                        <h3 className="mt-2 text-lg font-medium text-[#1a1511] transition-transform duration-300 group-hover:-translate-y-0.5">
                          {product.name}
                        </h3>
                        <p className="mt-2 text-sm text-[#4f4337] transition-opacity duration-300 group-hover:opacity-90">₹{product.price}</p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section id="collection" className="px-6 md:px-12 py-24" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.18 }}>
        <h2 className="text-3xl md:text-4xl text-center mb-14 font-light tracking-wide">Our Collection</h2>
        <ProductGrid products={products} className="md:grid-cols-3 xl:grid-cols-3" />
      </motion.section>

      <div className="border-t border-gray-200 mx-6 md:mx-12" />

      <motion.section id="how-it-works" className="px-6 md:px-16 py-24 bg-[#efe7dc]" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wide">How It Works</h2>
          <p className="text-sm md:text-base text-[#4d443a]">Your piece is made only when you decide. No inventory. No compromise.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 text-center">
          {[
            ["🎀", "You Choose", "Browse and select the piece that speaks to you."],
            ["🧵", "We Create", "We craft your piece from scratch—only after you order."],
            ["🌿", "It Arrives", "Your made-for-you piece arrives, ready to be worn and loved."],
          ].map((item) => (
            <motion.div
              key={item[1]}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="flex flex-col items-center gap-3 rounded-3xl px-4 py-6"
            >
              <motion.div whileHover={{ scale: 1.18, rotate: 4 }} className="text-2xl">
                {item[0]}
              </motion.div>
              <h3 className="font-medium text-[#1a1511]">{item[1]}</h3>
              <p className="text-sm text-[#4d443a] max-w-[200px] leading-[1.65]">{item[2]}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <section className="px-6 md:px-16 py-24 md:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <p className="text-[11px] md:text-xs uppercase tracking-[0.36em] text-[#7a6855]">Our Story</p>
            <h2 className="mt-3 font-['Iowan_Old_Style','Book_Antiqua','Palatino_Linotype',serif] text-4xl md:text-6xl font-light tracking-[-0.04em] text-[#17130f]">
              Made with Intention
            </h2>
            <p className="mt-3 text-[11px] md:text-sm uppercase tracking-[0.22em] text-[#8a7a68]">
              Crafted only when you choose
            </p>

            <div className="relative mt-10 w-full max-w-[380px] overflow-hidden rounded-[32px] border border-[#e7ddd0] bg-white/70 shadow-[0_14px_36px_rgba(17,17,17,0.07)]">
              <motion.div
                className="relative aspect-[4/5] w-full"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/story.jpg"
                  alt="madebyhr story"
                  fill
                  sizes="(max-width: 768px) 100vw, 380px"
                  loading="eager"
                  className="object-cover scale-[0.97]"
                />
              </motion.div>
            </div>

            <motion.div
              className="mt-8 max-w-lg space-y-4"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              {storyLines.map((line) => (
                <p key={line} className="text-sm md:text-[15px] leading-[1.72] text-[#4d443a]">
                  {line}
                </p>
              ))}
            </motion.div>

            <Link
              href="#collection"
              className="mt-9 inline-flex items-center justify-center rounded-full border border-black/5 bg-[#111111] px-8 py-3 text-xs uppercase tracking-[0.16em] text-white shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:bg-[#1b1b1b] hover:shadow-[0_18px_34px_rgba(0,0,0,0.22)] active:scale-[0.97]"
            >
              Explore Collection
            </Link>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 text-[#4d443a]">
              <a
                href="mailto:madebyhrclothing@gmail.com"
                className="inline-flex items-center gap-2 text-[11px] md:text-xs transition duration-300 hover:-translate-y-0.5 hover:text-[#1a1511]"
              >
                <EmailIcon />
                <span>madebyhrclothing@gmail.com</span>
              </a>

              <span aria-hidden="true" className="hidden sm:inline-block text-[#c6b8a7]">•</span>

              <a
                href="https://wa.me/919902379397"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[11px] md:text-xs transition duration-300 hover:-translate-y-0.5 hover:text-[#1a1511] hover:scale-[1.02]"
                aria-label="Contact madebyhr on WhatsApp"
              >
                <WhatsAppIcon />
                <span>WhatsApp</span>
              </a>

              <span aria-hidden="true" className="hidden sm:inline-block text-[#c6b8a7]">•</span>

              <a
                href="https://www.instagram.com/madebyhr.co?igsh=emd2cmVtYjJpN2U0"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[11px] md:text-xs transition duration-300 hover:-translate-y-0.5 hover:text-[#1a1511] hover:scale-[1.02]"
                aria-label="Visit madebyhr on Instagram"
              >
                <InstagramIcon />
                <span>Instagram</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
