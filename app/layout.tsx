import "./globals.css";
import Script from "next/script"; // ✅ ADD THIS
import type { Metadata } from "next";
import type { ReactNode } from "react";
import RootShell from "@/components/layout/RootShell";

import { Playfair_Display, Inter } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mademyhr.in"),
  title: "MadeByHR – Custom Clothing India",
  description: "Premium made-to-order clothing brand in India. Designed for you.",
  keywords: ["custom clothing India", "made to order outfits", "premium streetwear India"],
  openGraph: {
    title: "MadeByHR – Custom Clothing India",
    description: "Premium made-to-order clothing brand in India. Designed for you.",
    url: "https://www.mademyhr.in",
    siteName: "MadeByHR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.mademyhr.in",
  },
  verification: {
    google: "JAk2YgEaObB3Fy-dCkJmHtLGTRRQQHjjYYAvFtCvP5U"
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MadeByHR",
  url: "https://www.mademyhr.in",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const jsonLd = JSON.stringify(organizationJsonLd);

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </head>
      <body className={`${playfair.variable} ${inter.variable}`}>
        {/* ✅ CORRECT WAY */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        <RootShell>{children}</RootShell>

      </body>
    </html>
  );
}