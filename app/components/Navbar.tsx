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

  // ✅ FIX 1: add type
  const searchRef = useRef<HTMLDivElement | null>(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    // ✅ FIX 2: add type + safe casting
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
    <nav className="bg-black text-white px-6 md:px-12 py-4 flex items-center justify-between sticky top-0 z-50">

      {/* LOGO */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="madebyhr"
          width={120}
          height={40}
          priority
          style={{ height: "auto" }}
          className="hover:opacity-80 transition"
        />
      </Link>

      {/* NAV LINKS */}
      <div className="hidden md:flex gap-10 text-sm tracking-wide">

        <Link href="/about" className="relative group">
          About Us
          <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all group-hover:w-full"></span>
        </Link>

        <Link href="/" className="relative group">
          Shop
          <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all group-hover:w-full"></span>
        </Link>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-5 relative">

        {/* SEARCH */}
        <div ref={searchRef} className="relative">

          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowResults(true);
            }}
            className="bg-white text-black text-sm px-4 py-2 rounded-full outline-none w-[130px] focus:w-[200px] transition-all duration-300 shadow-sm"
          />

          {/* DROPDOWN */}
          {showResults && search && (
            <div className="absolute top-12 right-0 bg-white text-black w-56 rounded-xl shadow-xl overflow-hidden animate-dropdown z-50">

              {filtered.length > 0 ? (
                filtered.map((item, i) => (
                  <Link
                    key={i}
                    href={item.link}
                    onClick={() => {
                      setShowResults(false);
                      setSearch("");
                    }}
                    className="block px-4 py-3 hover:bg-[#f5efe6] text-sm transition"
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

        {/* WISHLIST */}
        <button className="text-lg hover:scale-110 transition duration-200">
          ♡
        </button>

        {/* CART */}
        <Link
          href="/cart"
          className="text-lg hover:scale-110 transition duration-200"
        >
          🛒
        </Link>

      </div>

    </nav>
  );
}