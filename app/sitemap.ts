import type { MetadataRoute } from "next";
import { getCatalogProducts } from "@/features/products/product.service";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.mademyhr.in";
  const lastModified = new Date();
  const products = getCatalogProducts();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/product`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...products.map((product) => ({
      url: `${baseUrl}/product/${product.id}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
