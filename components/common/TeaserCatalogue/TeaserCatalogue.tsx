import Image from "next/image";
import s from "./TeaserCatalogue.module.css";
import { Product } from "utils/types/types";

interface CardProps {
  product: Product;
}

interface TeaserCatalogueProps {
  products: Array<Product>;
}

const Card = ({ product }: CardProps) => {
  return (
    <div className="lg:m-4 shadow-md hover:shadow-lg hover:bg-gray-100 rounded-lg bg-white my-12 mx-8">
      <Image
        className="w-full h-auto object-cover rounded-t-lg"
        src={product.image?.url}
        height={200}
        width={300}
        layout="responsive"
        quality="85"
      />
      <div className="px-4 py-2">
        <h3 className="font-medium text-gray-600 text-lg my-2 uppercase">
          {product.name}
          {/* <div>{product.price}</div> */}
        </h3>

        <p className="text-justify">{product.description}</p>
      </div>
    </div>
  );
};

const TeaserCatalogue = ({ products }: TeaserCatalogueProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3">
      {products.map((product) => (
        <Card product={product} />
      ))}
    </div>
  );
};

export default TeaserCatalogue;
