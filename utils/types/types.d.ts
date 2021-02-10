export interface Product {
  id?: string;
  name: string;
  price?: number;
  image?: { name: string; url: string };
  description?: string;
}
