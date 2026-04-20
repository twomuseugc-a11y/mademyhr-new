"use client";

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { CartProvider } from "@/features/cart/cart.context";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${playfair.variable} ${inter.variable}`}>

        {/* ✅ CORRECT WAY */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        <MotionConfig reducedMotion="user">
          <CartProvider>
            <Navbar />
            <AnimatePresence mode="sync" initial={false}>
              <motion.main
                key={pathname}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
              >
                {children}
              </motion.main>
            </AnimatePresence>
          </CartProvider>
        </MotionConfig>

      </body>
    </html>
  );
}