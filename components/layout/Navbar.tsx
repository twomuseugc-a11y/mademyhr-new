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
    <nav className="bg-black text-white px-6 md:px-12 py-5 flex items-center justify-between sticky top-0 z-50 border-b border-white/10">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="madebyhr logo"
          width={120}
          height={40}
          priority
          className="hover:opacity-80 transition duration-300"
        />
      </Link>

      <div className="hidden md:flex gap-12 text-[13px] tracking-[0.15em] uppercase">
        <Link href="/about" className="relative group">
          About
          <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white/80 transition-all duration-300 group-hover:w-full" />
        </Link>
        <Link href="/product" className="relative group">
          Shop
          <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white/80 transition-all duration-300 group-hover:w-full" />
        </Link>
      </div>

      <div className="flex items-center gap-4 md:gap-6 relative">
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="bg-white text-black text-sm px-4 py-2 rounded-full outline-none w-[120px] focus:w-[220px] transition-all duration-300 shadow-sm"
          />

          {search && (
            <div className="absolute top-12 right-0 bg-white text-black w-64 rounded-xl shadow-xl overflow-hidden z-50">
              {filtered.length > 0 ? (
                filtered.slice(0, 6).map((item) => (
                  <Link
                    key={item.link}
                    href={item.link}
                    onClick={() => setSearch("")}
                    className="block px-4 py-3 text-sm hover:bg-[#f5efe6]"
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

        <Link href="/cart" className="text-lg hover:scale-110 transition">
          🛒
        </Link>

        <button className="md:hidden text-2xl" onClick={() => setMenuOpen((prev) => !prev)}>
          ☰
        </button>
      </div>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col items-center gap-6 py-6 md:hidden">
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
