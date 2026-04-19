"use client";

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { CartProvider } from "@/features/cart/cart.context";
import { useEffect, type ReactNode } from "react";
import Script from "next/script"; // ✅ ADD THIS

import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${playfair.variable} ${inter.variable}`}>

        {/* ✅ CORRECT WAY */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>

      </body>
    </html>
  );
}