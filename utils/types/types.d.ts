export interface ImageField {
  public_id: string;
  url: string;
  filename: string;
}

export interface ProductType {
  _id?: string;
  name: string;
  price: number;
  description: string;
  type: string;
  mainImage: ImageField;
  secondaryImage: Array<ImageField>;
}

export interface SearchProductType extends ProductType {
  highlights: {
    name: { value: string; type: "text" | "hit" }[];
    description: { value: string; type: "text" | "hit" }[];
  };
}
