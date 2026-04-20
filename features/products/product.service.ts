import { products } from "@/lib/products";
import type { Product } from "./product.types";

const product5: Product = {
  id: "5",
  name: "Midnight Ease Co-ord Set",
  price: 1499,
  description:
    "Keep it effortlessly stylish with the Midnight Ease Co-ord Set, designed in a timeless black shade. Crafted from soft cotton fabric, this set offers a perfect balance of comfort and minimal elegance. Lightweight and breathable, it’s ideal for all-day wear—whether you're heading out or relaxing in style. The coordinated design gives a clean, modern look that never goes out of trend.",
  details: [
    "Made from premium cotton fabric",
    "Lightweight and breathable for everyday comfort",
    "Soft and gentle on the skin",
    "Minimal and versatile co-ord design",
    "Classic black color for a sleek, timeless look",
    "Perfect for casual wear, travel, and lounging",
  ],
  care: ["Machine wash cold", "Do not bleach", "Iron on low heat"],
  delivery: "Made-to-order. Ships in 15-20 days.",
  images: ["/products/p5-1.jpg", "/products/p5-2.jpg", "/products/p5-3.jpg"],
  sizes: ["S", "M", "L", "XL", "Custom"],
  fit: ["Regular", "Oversized"],
};

const product7: Product = {
  id: "7",
  name: "Coco Calm Co-ord Set",
  price: 1499,
  description:
    "Embrace effortless comfort with the Coco Calm Co-ord Set, designed in a warm brown tone for a relaxed yet refined look. Crafted from soft cotton fabric, this set is lightweight, breathable, and perfect for all-day wear. Its minimal design and earthy vibe make it a versatile choice for casual outings, travel, or laid-back everyday styling.",
  details: [
    "Made from premium cotton fabric",
    "Lightweight and breathable for all-day comfort",
    "Soft and gentle on the skin",
    "Minimal and versatile co-ord design",
    "Warm brown shade for an earthy, elegant look",
    "Perfect for casual wear, travel, and everyday styling",
  ],
  care: ["Machine wash cold", "Do not bleach", "Iron on low heat"],
  delivery: "Made-to-order. Ships in 15-20 days.",
  images: ["/products/p7-1.jpg", "/products/p7-2.jpg", "/products/p7-3.jpg"],
  sizes: ["S", "M", "L", "XL", "Custom"],
  fit: ["Regular", "Oversized"],
};

const product8: Product = {
  id: "8",
  name: "Snow Grace Co-ord Set",
  price: 1499,
  description:
    "Embrace timeless elegance with the Snow Grace Co-ord Set, designed in a crisp white shade for a fresh and refined look. Crafted from soft cotton fabric, this set is lightweight, breathable, and exceptionally comfortable for all-day wear. Its minimal yet graceful design makes it perfect for effortless styling-whether you're stepping out or keeping it relaxed.",
  details: [
    "Made from premium cotton fabric",
    "Lightweight and breathable for all-day comfort",
    "Soft and gentle on the skin",
    "Minimal and elegant co-ord design",
    "Classic white color for a clean, timeless look",
    "Perfect for casual wear, travel, and everyday styling",
  ],
  care: ["Machine wash cold", "Do not bleach", "Iron on low heat"],
  delivery: "Made-to-order. Ships in 15-20 days.",
  images: ["/products/p8-1.jpg", "/products/p8-2.jpg", "/products/p8-3.jpg"],
  sizes: ["S", "M", "L", "XL", "Custom"],
  fit: ["Regular", "Oversized"],
};

const product9: Product = {
  id: "9",
  name: "Ocean Muse Co-ord Set",
  price: 1499,
  description:
    "Refresh your wardrobe with the Ocean Muse Co-ord Set, inspired by calm and effortless style. Designed in a soothing blue tone, this set is crafted from soft cotton fabric that feels light, breathable, and comfortable all day long. Its minimal yet elegant look makes it perfect for casual outings, travel, or relaxed everyday wear.",
  details: [
    "Made from premium cotton fabric",
    "Lightweight and breathable for all-day comfort",
    "Soft and gentle on the skin",
    "Minimal and versatile co-ord design",
    "Soothing blue shade inspired by ocean tones",
    "Perfect for casual wear, travel, and everyday styling",
  ],
  care: ["Machine wash cold", "Do not bleach", "Iron on low heat"],
  delivery: "Made-to-order. Ships in 15-20 days.",
  images: ["/products/p9-1.jpg", "/products/p9-2.jpg", "/products/p9-3.jpg"],
  sizes: ["S", "M", "L", "XL", "Custom"],
  fit: ["Regular", "Oversized"],
};

const product10: Product = {
  id: "10",
  name: "Coco Calm Co-ord Set (Shorts)",
  price: 1499,
  description:
    "Embrace effortless comfort with the Coco Calm Co-ord Set (Shorts), designed in a warm brown tone for a relaxed yet refined look. Crafted from soft cotton fabric, this shorts set is lightweight, breathable, and perfect for all-day wear. Its minimal design and earthy vibe make it a versatile choice for casual outings, travel, or laid-back everyday styling.",
  details: [
    "Made from premium cotton fabric",
    "Lightweight and breathable for all-day comfort",
    "Soft and gentle on the skin",
    "Minimal and versatile co-ord design",
    "Includes matching shorts bottom",
    "Warm brown shade for an earthy, elegant look",
    "Perfect for casual wear, travel, and everyday styling",
  ],
  care: ["Machine wash cold", "Do not bleach", "Iron on low heat"],
  delivery: "Made-to-order. Ships in 15-20 days.",
  images: ["/products/p10-1.jpg", "/products/p10-2.jpg", "/products/p10-3.jpg"],
  sizes: ["S", "M", "L", "XL", "Custom"],
  fit: ["Shorts"],
};

const product11: Product = {
  id: "11",
  name: "Midnight Ease Co-ord Set (Shorts)",
  price: 1499,
  description:
    "Keep it effortlessly stylish with the Midnight Ease Co-ord Set (Shorts), designed in a timeless black shade. Crafted from soft cotton fabric, this shorts set offers a perfect balance of comfort and minimal elegance. Lightweight and breathable, it's ideal for all-day wear-whether you're heading out or relaxing in style. The coordinated design gives a clean, modern look that never goes out of trend.",
  details: [
    "Made from premium cotton fabric",
    "Lightweight and breathable for everyday comfort",
    "Soft and gentle on the skin",
    "Minimal and versatile co-ord design",
    "Classic black color for a sleek, timeless look",
    "Perfect for casual wear, travel, and lounging",
  ],
  care: ["Machine wash cold", "Do not bleach", "Iron on low heat"],
  delivery: "Made-to-order. Ships in 15-20 days.",
  images: ["/products/p11-1.jpg", "/products/p11-2.jpg", "/products/p11-3.jpg"],
  sizes: ["S", "M", "L", "XL", "Custom"],
  fit: ["Regular", "Oversized", "Shorts"],
};

const product12: Product = {
  id: "12",
  name: "Ocean Muse Co-ord Set (Shorts)",
  price: 1499,
  description:
    "Refresh your wardrobe with the Ocean Muse Co-ord Set (Shorts), inspired by calm and effortless style. Designed in a soothing blue tone, this shorts set is crafted from soft cotton fabric that feels light, breathable, and comfortable all day long. Its minimal yet elegant look makes it perfect for casual outings, travel, or relaxed everyday wear.",
  details: [
    "Made from premium cotton fabric",
    "Lightweight and breathable for all-day comfort",
    "Soft and gentle on the skin",
    "Minimal and versatile co-ord design",
    "Soothing blue shade inspired by ocean tones",
    "Perfect for casual wear, travel, and everyday styling",
  ],
  care: ["Machine wash cold", "Do not bleach", "Iron on low heat"],
  delivery: "Made-to-order. Ships in 15-20 days.",
  images: ["/products/p12-1.jpg", "/products/p12-2.jpg", "/products/p12-3.jpg"],
  sizes: ["S", "M", "L", "XL", "Custom"],
  fit: ["Regular", "Oversized", "Shorts"],
};

const product13: Product = {
  id: "13",
  name: "Snow Grace Co-ord Set (Shorts)",
  price: 1499,
  description:
    "Embrace timeless elegance with the Snow Grace Co-ord Set (Shorts), designed in a crisp white shade for a fresh and refined look. Crafted from soft cotton fabric, this shorts set is lightweight, breathable, and exceptionally comfortable for all-day wear. Its minimal yet graceful design makes it perfect for effortless styling-whether you're stepping out or keeping it relaxed.",
  details: [
    "Made from premium cotton fabric",
    "Lightweight and breathable for all-day comfort",
    "Soft and gentle on the skin",
    "Minimal and elegant co-ord design",
    "Classic white color for a clean, timeless look",
    "Perfect for casual wear, travel, and everyday styling",
  ],
  care: ["Machine wash cold", "Do not bleach", "Iron on low heat"],
  delivery: "Made-to-order. Ships in 15-20 days.",
  images: ["/products/p13-1.jpg", "/products/p13-2.jpg", "/products/p13-3.jpg"],
  sizes: ["S", "M", "L", "XL", "Custom"],
  fit: ["Regular", "Oversized", "Shorts"],
};

export function getCatalogProducts(): Product[] {
  const baseCatalog = products.filter((product) => product.id !== "5" && product.id !== "7" && product.id !== "8" && product.id !== "9" && product.id !== "10" && product.id !== "11" && product.id !== "12" && product.id !== "13");

  return [...baseCatalog, product5, product7, product8, product9, product10, product11, product12, product13]
    .sort((a, b) => Number(a.id) - Number(b.id))
    .map((product) => ({
    ...product,
    images: [...product.images],
    sizes: [...product.sizes],
    fit: [...product.fit],
    details: product.details ? [...product.details] : undefined,
    care: product.care ? [...product.care] : undefined,
    })) as Product[];
}

export function getProductById(id: string): Product | undefined {
  return getCatalogProducts().find((product) => product.id === id);
}
