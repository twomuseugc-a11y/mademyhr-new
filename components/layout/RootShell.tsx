"use client";

import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { CartProvider } from "@/features/cart/cart.context";

export default function RootShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return (
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
  );
}
