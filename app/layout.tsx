import "./globals.css";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";
import type { ReactNode } from "react";

// ✅ ADD FONTS
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
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${inter.variable}`}>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}