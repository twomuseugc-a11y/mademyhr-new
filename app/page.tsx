"use client";

import Image from "next/image";
import Link from "next/link";
// import FadeIn from "./components/FadeIn";
import { useEffect, useState } from "react";

export default function Home() {
  const [dbProducts, setDbProducts] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any

  // ✅ FETCH DB PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        // ✅ FILTER OUT bad products from the DB
        const blockedNames = ["corsety", "corset", "cordsety", "cordset", "cordsety"];
        const validProducts = data.filter((p: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
          const hasName = typeof p.name === "string" && p.name.trim() !== "";
          const isBlockedName = blockedNames.some((blocked) =>
            p.name?.toLowerCase().includes(blocked)
          );
          const hasPrice = typeof p.price === "number" && p.price > 0;
          const validImage =
            typeof p.image === "string" &&
            p.image.startsWith("/") &&
            !p.image.includes("cloudinary.com");

          return hasName && !isBlockedName && hasPrice && validImage;
        });

        const safeProducts = validProducts.map((p: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
          _id: p._id,
          name: p.name,
          price: `₹${p.price}`,
          img: p.image,
        }));

        setDbProducts(safeProducts);
      } catch (err) { // eslint-disable-line @typescript-eslint/no-unused-vars
        console.log("Error fetching products");
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="bg-[#f5efe6] text-[#1a1a1a]">

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20">

        <div className="absolute w-[600px] h-[600px] bg-[#e8dfd3] rounded-full blur-3xl opacity-40 top-[-100px] left-[-100px]" />
        <div className="absolute w-[500px] h-[500px] bg-[#e0d6c8] rounded-full blur-3xl opacity-40 bottom-[-100px] right-[-100px]" />

        <div className="relative z-10 text-center px-6 max-w-3xl">
          
          <div>
            <h1 className="text-4xl md:text-7xl font-light leading-tight tracking-wide">
              Made slowly,<br />
              <span className="italic">worn proudly.</span>
            </h1>
          </div>

          <div>
            <p className="mt-6 text-[#4a4a4a] max-w-md mx-auto leading-relaxed">
              Thoughtfully crafted pieces designed for comfort, simplicity,
              and timeless everyday wear.
            </p>
          </div>

          <div>
            <div className="mt-10">
              <a
                href="#collection"
                className="px-10 py-3 bg-[#b88a5a] text-white rounded-full text-sm tracking-[0.1em] hover:opacity-90 hover:shadow-md transition"
              >
                EXPLORE COLLECTION
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* COLLECTION */}
      <section id="collection" className="px-6 md:px-12 py-24">

        <div>
          <h2 className="text-3xl md:text-4xl text-center mb-14 font-light tracking-wide">
            Our Collection
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">

          {[
            // ✅ STATIC PRODUCTS
            { name: "Linen Wrap Dress", price: "₹4,200", img: "/product1.jpg" },
            { name: "Cozy Knit Sweater", price: "₹2,800", img: "/product2.jpg" },
            { name: "Satin Midi Skirt", price: "₹3,200", img: "/product3.jpg" },

            // ✅ DB PRODUCTS SAFE
            ...dbProducts,
          ].map((item: any, i) => ( // eslint-disable-line @typescript-eslint/no-explicit-any

            <div key={i}>
              <Link
                href={item._id ? `/product/${item._id}` : "/product"}
                className="group block"
              >

                {/* IMAGE */}
                <div className="relative w-full h-[300px] overflow-hidden rounded-2xl group">

                  <div className="absolute inset-0 bg-white z-10 translate-y-0 group-hover:translate-y-full transition duration-700"></div>

                  {/* ✅ FIX: NEVER EMPTY SRC */}
                  {item.img && item.img !== "/product1.jpg" && item.img !== "/product2.jpg" && item.img !== "/product3.jpg" ? (
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                      Image<br />Coming Soon
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                </div>

                {/* TEXT */}
                <h3 className="mt-4 text-sm tracking-wide group-hover:underline transition">
                  {item.name}
                </h3>

                <p className="text-sm text-[#4a4a4a] mt-1">
                  {item.price}
                </p>

              </Link>
            </div>

          ))}

        </div>

      </section>

      {/* DIVIDER */}
      <div className="border-t border-gray-200 mx-6 md:mx-12"></div>

      {/* WHY US */}
      <section className="px-6 md:px-16 py-24 bg-[#efe7dc]">

        <div>
          <h2 className="text-3xl md:text-4xl text-center font-light mb-14 tracking-wide">
            Why madebyhr
          </h2>
        </div>

        <div>
          <div className="grid md:grid-cols-3 gap-12 text-center">

            <div className="flex flex-col items-center gap-3">
              <div className="text-2xl">🎀</div>
              <h3 className="font-medium">Made to Order</h3>
              <p className="text-sm text-[#4a4a4a] max-w-[200px]">
                Each piece is crafted only after you order.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="text-2xl">🧵</div>
              <h3 className="font-medium">No Mass Production</h3>
              <p className="text-sm text-[#4a4a4a] max-w-[200px]">
                Slow fashion that values quality over quantity.
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="text-2xl">🌿</div>
              <h3 className="font-medium">Crafted with Care</h3>
              <p className="text-sm text-[#4a4a4a] max-w-[200px]">
                Designed for comfort and timeless wear.
              </p>
            </div>

          </div>
        </div>

      </section>

      {/* STORY */}
      <section className="px-6 md:px-16 py-24">

        <div>
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
              <h2 className="text-3xl md:text-4xl font-light mb-6">
                Our Story
              </h2>
              <p className="text-sm text-[#4a4a4a]">
                madebyhr began with two best friends who believed clothing should feel more personal.
              </p>
            </div>

          </div>
        </div>

      </section>

      <footer className="bg-black text-white text-center py-6 text-xs mt-10 relative">
        <div className="absolute bottom-4 right-4">
          <a
            href="/login"
            className="text-xs text-gray-400 hover:text-white transition"
          >
            Admin Login
          </a>
        </div>
        © {new Date().getFullYear()} madebyhr
      </footer>

    </main>
  );
}