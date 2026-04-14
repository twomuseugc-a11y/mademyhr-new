"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const products = [
  { name: "Linen Wrap Dress", link: "/product" },
  { name: "Cozy Knit Sweater", link: "/product" },
  { name: "Satin Midi Skirt", link: "/product" },
];

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement | null>(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-black text-white px-6 md:px-12 py-5 flex items-center justify-between sticky top-0 z-50 border-b border-white/10">

      {/* LOGO */}
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

      {/* DESKTOP NAV */}
      <div className="hidden md:flex gap-12 text-[13px] tracking-[0.15em] uppercase">
        <Link href="/about" className="relative group">
          About
          <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white/80 transition-all duration-300 group-hover:w-full"></span>
        </Link>

        <Link href="/" className="relative group">
          Shop
          <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white/80 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4 md:gap-6 relative">

        {/* SEARCH */}
        <div ref={searchRef} className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowResults(true);
            }}
            className="bg-white text-black text-sm px-4 py-2 rounded-full outline-none w-[120px] focus:w-[200px] transition-all duration-300 shadow-sm"
          />

          {showResults && search && (
            <div className="absolute top-12 right-0 bg-white text-black w-60 rounded-xl shadow-xl overflow-hidden z-50">
              {filtered.length > 0 ? (
                filtered.map((item, i) => (
                  <Link
                    key={i}
                    href={item.link}
                    onClick={() => {
                      setShowResults(false);
                      setSearch("");
                    }}
                    className="block px-4 py-3 text-sm hover:bg-[#f5efe6]"
                  >
                    {item.name}
                  </Link>
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-gray-500">
                  No results found
                </p>
              )}
            </div>
          )}
        </div>

        {/* CART */}
        <Link href="/cart" className="text-lg hover:scale-110 transition">
          🛒
        </Link>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black text-white flex flex-col items-center gap-6 py-6 md:hidden animate-fadeIn">

          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className="text-sm tracking-wide"
          >
            About
          </Link>

          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-sm tracking-wide"
          >
            Shop
          </Link>

          {/* MOBILE SEARCH */}
          <input
            type="text"
            placeholder="Search"
            className="bg-white text-black px-4 py-2 rounded-full w-[80%]"
          />
        </div>
      )}
    </nav>
  );
}