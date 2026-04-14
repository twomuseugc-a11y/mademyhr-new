"use client";

import { motion } from "framer-motion";

export default function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 1,
        delay,
        ease: [0.25, 1, 0.5, 1],
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}