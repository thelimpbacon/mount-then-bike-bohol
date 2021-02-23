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
