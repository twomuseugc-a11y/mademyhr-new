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
