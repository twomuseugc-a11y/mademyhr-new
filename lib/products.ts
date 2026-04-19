export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  details?: string[];
  care?: string[];
  delivery?: string;
  images: string[];
  sizes: string[];
  fit: string[];
};

export const products: Product[] = [
  {
    id: "1",
    name: "Maroon Muse Bow Top",
    price: 899,
    description:
      "Add a touch of elegance to your wardrobe with the Maroon Muse Bow Top. Crafted in a rich maroon shade, this top features delicate bow-tie sleeves that bring a subtle yet stylish charm. Made from soft cotton fabric, it is lightweight, breathable, and designed for all-day comfort-perfect for both casual outings and refined everyday looks.",
    details: [
      "Made from premium cotton fabric",
      "Lightweight and breathable for everyday wear",
      "Soft and comfortable on the skin",
      "Elegant bow-tie sleeve detailing",
      "Rich maroon color for a classy look",
      "Suitable for casual and semi-formal occasions",
    ],
    care: [
      "Machine wash cold",
      "Do not bleach",
      "Iron on low heat",
    ],
    delivery: "Made-to-order. Ships in 15-20 days.",
    images: ["/products/p1-1.jpg", "/products/p1-2.jpg", "/products/p1-3.jpg"],
    sizes: ["S", "M", "L", "XL", "Custom"],
    fit: ["Regular", "Oversized"],
  },
  {
    id: "2",
    name: "Maroon Muse Bow Top",
    price: 899,
    description:
      "Add a touch of elegance to your wardrobe with the Maroon Muse Bow Top. Crafted in a rich maroon shade, this top features delicate bow-tie sleeves that bring a subtle yet stylish charm. Made from soft cotton fabric, it is lightweight, breathable, and designed for all-day comfort-perfect for both casual outings and refined everyday looks.",
    details: [
      "Made from premium cotton fabric",
      "Lightweight and breathable for everyday wear",
      "Soft and comfortable on the skin",
      "Elegant bow-tie sleeve detailing",
      "Rich maroon color for a classy look",
      "Suitable for casual and semi-formal occasions",
    ],
    care: [
      "Machine wash cold",
      "Do not bleach",
      "Iron on low heat",
    ],
    delivery: "Made-to-order. Ships in 15-20 days.",
    images: ["/products/p2-1.jpg", "/products/p2-2.jpg", "/products/p2-3.jpg"],
    sizes: ["S", "M", "L", "XL", "Custom"],
    fit: ["Regular", "Oversized"],
  },
  {
    id: "3",
    name: "Midnight Charm Bow Top",
    price: 899,
    description:
      "Elevate your everyday style with the Midnight Charm Bow Top. Designed in a timeless black shade, this top features elegant bow-tie sleeves that add a subtle touch of sophistication. Crafted from soft cotton fabric, it is lightweight, breathable, and ensures all-day comfort-perfect for both casual outings and effortlessly chic looks.",
    details: [
      "Made from premium cotton fabric",
      "Lightweight and breathable for all-day wear",
      "Soft and comfortable on the skin",
      "Elegant bow-tie sleeve detailing",
      "Classic black color for a timeless look",
      "Ideal for casual and semi-formal styling",
    ],
    care: [
      "Machine wash cold",
      "Do not bleach",
      "Iron on low heat",
    ],
    delivery: "Made-to-order. Ships in 15-20 days.",
    images: ["/products/p3-1.jpg", "/products/p3-2.jpg", "/products/p3-3.jpg"],
    sizes: ["S", "M", "L", "XL", "Custom"],
    fit: ["Regular", "Oversized"],
  },
  {
    id: "4",
    name: "Marigold Muse Co-ord Set",
    price: 1499,
    description:
      "Brighten your wardrobe with the Marigold Muse Co-ord Set, crafted in beautiful yellow Hakoba fabric. Featuring delicate eyelet embroidery and intricate cutwork, this set blends elegance with everyday comfort. The lightweight and breathable cotton fabric keeps you cool, while the coordinated design offers a stylish, effortlessly put-together look-perfect for casual outings, brunch dates, or festive days.",
    details: [
      "Made from premium Hakoba cotton fabric",
      "Intricate eyelet embroidery with detailed cutwork",
      "Lightweight and breathable for all-day comfort",
      "Soft, airy, and skin-friendly fabric",
      "Co-ordinated top and bottom set",
      "Fresh marigold yellow shade for a vibrant look",
      "Ideal for casual, festive, and summer wear",
    ],
    care: [
      "Gentle machine wash or hand wash recommended",
      "Do not bleach",
      "Iron on low heat",
    ],
    delivery: "Made-to-order. Ships in 15-20 days.",
    images: ["/products/p4-1.jpg", "/products/p4-2.jpg", "/products/p4-3.jpg"],
    sizes: ["S", "M", "L", "XL", "Custom"],
    fit: ["Regular", "Oversized"],
  },
  {
    id: "5",
    name: "Tailored Wide Trousers",
    price: 4500,
    description: "Clean lines and a luxurious drape for modern tailoring.",
    details: [
      "High-rise tailored waist",
      "Press-crease finish",
      "Soft breathable lining",
    ],
    care: [
      "Machine wash cold",
      "Cool iron if needed",
      "Store folded or hung",
    ],
    delivery: "Made-to-order. Ships in 15-20 days.",
    images: ["/products/p5-2.jpg", "/products/p5-1.jpg", "/products/p5-3.jpg"],
    sizes: ["S", "M", "L", "XL", "Custom"],
    fit: ["Regular", "Oversized"],
  },
  {
    id: "6",
    name: "Lavender Blossom Co-ord Set",
    price: 1499,
    description:
      "Step into soft elegance with the Lavender Blossom Co-ord Set, crafted in delicate Hakoba fabric. Featuring intricate eyelet embroidery and detailed cutwork, this set brings a graceful, feminine charm to your wardrobe. The lightweight and breathable cotton ensures all-day comfort, while the soothing lavender hue adds a fresh, dreamy vibe-perfect for brunches, vacations, and effortless everyday styling.",
    details: [
      "Made from premium Hakoba cotton fabric",
      "Intricate eyelet embroidery with fine cutwork detailing",
      "Lightweight and breathable for maximum comfort",
      "Soft, airy, and gentle on the skin",
      "Co-ordinated top and bottom set",
      "Elegant lavender shade for a soft, feminine look",
      "Perfect for casual outings, vacations, and summer wear",
    ],
    care: [
      "Gentle machine wash or hand wash recommended",
      "Do not bleach",
      "Iron on low heat",
    ],
    delivery: "Made-to-order. Ships in 15-20 days.",
    images: ["/products/p6-1.jpg", "/products/p6-2.jpg", "/products/p6-3.jpg"],
    sizes: ["S", "M", "L", "XL", "Custom"],
    fit: ["Regular", "Oversized"],
  },
  {
    id: "7",
    name: "Knitted Midi Dress",
    price: 4000,
    description: "Soft knit with a flattering waist and gentle stretch.",
    details: [
      "Premium cotton blend",
      "Figure-flattering silhouette",
      "Breathable textured knit",
    ],
    care: [
      "Machine wash gentle",
      "Dry flat",
      "Do not bleach",
    ],
    delivery: "Made-to-order. Ships in 15-20 days.",
    images: ["/products/p7-1.jpg", "/products/p7-2.jpg", "/products/p7-3.jpg"],
    sizes: ["S", "M", "L", "XL", "Custom"],
    fit: ["Regular", "Oversized"],
  },
  {
    id: "8",
    name: "Ruffled Sleeve Blouse",
    price: 3200,
    description: "Romantic details and lightweight fabric for easy styling.",
    details: [
      "Delicate ruffle sleeves",
      "Soft woven fabric",
      "Button-front closure",
    ],
    care: [
      "Hand wash cold",
      "Dry flat",
      "Cool iron on reverse",
    ],
    delivery: "Made-to-order. Ships in 15-20 days.",
    images: ["/products/p8-1.jpg", "/products/p8-2.jpg", "/products/p8-3.jpg"],
    sizes: ["S", "M", "L", "XL", "Custom"],
    fit: ["Regular", "Oversized"],
  },
  {
    id: "9",
    name: "Denim Utility Jacket",
    price: 5600,
    description: "Structured denim with classic pockets and modern fit.",
    details: [
      "Reinforced front pockets",
      "Adjustable waist tabs",
      "Durable denim weave",
    ],
    care: [
      "Machine wash cold",
      "Tumble dry low",
      "Iron on medium heat",
    ],
    delivery: "Made-to-order. Ships in 15-20 days.",
    images: ["/products/p9-1.jpg", "/products/p9-2.jpg", "/products/p9-3.jpg"],
    sizes: ["S", "M", "L", "XL", "Custom"],
    fit: ["Regular", "Oversized"],
  },
  {
    id: "10",
    name: "Soft Tailored Jumpsuit",
    price: 6800,
    description: "A polished one-piece with adjustable details for comfort.",
    details: [
      "Tapered leg silhouette",
      "Invisible side zip",
      "Adjustable tie waist",
    ],
    care: [
      "Dry clean recommended",
      "Cool iron if needed",
      "Store hung up",
    ],
    delivery: "Made-to-order. Ships in 15-20 days.",
    images: ["/products/p10-1.jpg", "/products/p10-2.jpg", "/products/p10-3.jpg"],
    sizes: ["S", "M", "L", "XL", "Custom"],
    fit: ["Regular", "Oversized"],
  },
  {
    id: "11",
    name: "Satin Camisole Dress",
    price: 4800,
    description: "Sleek satin finish with delicate straps and a soft flow.",
    details: [
      "Luxe satin texture",
      "Bias cut for movement",
      "Delicate adjustable straps",
    ],
    care: [
      "Hand wash cold",
      "Dry flat",
      "Do not tumble dry",
    ],
    delivery: "Made-to-order. Ships in 15-20 days.",
    images: ["/products/p11-1.jpg", "/products/p11-2.jpg", "/products/p11-3.jpg"],
    sizes: ["S", "M", "L", "XL", "Custom"],
    fit: ["Regular", "Oversized"],
  },
  {
    id: "12",
    name: "Oversized Shirt Dress",
    price: 4100,
    description: "Relaxed silhouette with crisp cotton and utility-inspired details.",
    details: [
      "Soft cotton poplin",
      "Button-front closure",
      "Patch pockets for styling",
    ],
    care: [
      "Machine wash gentle",
      "Tumble dry low",
      "Iron on medium heat",
    ],
    delivery: "Made-to-order. Ships in 15-20 days.",
    images: ["/products/p12-1.jpg", "/products/p12-2.jpg", "/products/p12-3.jpg"],
    sizes: ["S", "M", "L", "XL", "Custom"],
    fit: ["Regular", "Oversized"],
  },
];






