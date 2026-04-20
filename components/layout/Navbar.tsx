"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const products = useProducts();

  const searchItems = useMemo(
    () =>
      products.map((product) => ({
        name: product.name,
        link: `/product/${product.id}`,
      })),
    [products]
  );

  const filtered = useMemo(
    () =>
      search
        ? searchItems.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
        : [],
    [searchItems, search]
  );

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-white/10 bg-black/82 px-6 py-4 text-white backdrop-blur-sm md:px-12">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="madebyhr logo"
          width={120}
          height={40}
          priority
          className="transition duration-300 hover:scale-[1.02] hover:opacity-85"
        />
      </Link>

      <div className="hidden md:flex gap-12 text-[13px] tracking-[0.15em] uppercase">
        <Link href="/about" className="nav-link relative group">
          About
          <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-white/85 transition-transform duration-300 group-hover:scale-x-100" />
        </Link>
        <Link href="/product" className="nav-link relative group">
          Shop
          <span className="absolute left-0 -bottom-1 h-[1px] w-full origin-left scale-x-0 bg-white/85 transition-transform duration-300 group-hover:scale-x-100" />
        </Link>
      </div>

      <div className="flex items-center gap-4 md:gap-6 relative">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-[120px] rounded-full border border-white/15 bg-white/95 px-4 py-2 text-sm text-black outline-none transition-all duration-300 focus:w-[220px] focus:border-white/30 focus:shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
          />

          {search && (
            <div className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-2xl border border-black/5 bg-white text-black shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
              {filtered.length > 0 ? (
                filtered.slice(0, 6).map((item) => (
                  <Link
                    key={item.link}
                    href={item.link}
                    onClick={() => setSearch("")}
                    className="block px-4 py-3 text-sm transition hover:bg-[#f5efe6]"
                  >
                    {item.name}
                  </Link>
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-gray-500">No results found</p>
              )}
            </div>
          )}
        </div>

        <Link href="/cart" className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-lg transition hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-[0_10px_24px_rgba(0,0,0,0.15)]">
          🛒
        </Link>

        <button className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-2xl transition hover:bg-white/10 md:hidden" onClick={() => setMenuOpen((prev) => !prev)}>
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="absolute left-0 top-full flex w-full flex-col items-center gap-6 bg-black/95 py-6 text-white backdrop-blur-sm md:hidden">
          <Link href="/about" onClick={() => setMenuOpen(false)} className="text-sm tracking-wide">
            About
          </Link>
          <Link href="/product" onClick={() => setMenuOpen(false)} className="text-sm tracking-wide">
            Shop
          </Link>
        </div>
      )}
    </nav>
  );
}
