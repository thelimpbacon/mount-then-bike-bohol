import Image from "next/image";
import Link from "next/link";
import { ProductType } from "utils/types/types";
import s from "./TeaserCatalogue.module.css";

interface CardProps {
  product: ProductType;
}

interface TeaserCatalogueProps {
  products: Array<ProductType>;
}

const Card = ({ product }: CardProps) => {
  return (
    <Link href={`/products/${product._id}`}>
      <a className={s.rootCard}>
        <Image
          className="object-cover w-full h-auto rounded-t-lg"
          src={product.mainImage?.url}
          height={200}
          width={300}
          layout="responsive"
          quality="85"
        />
        <div className="px-4 py-2">
          <h3 className="my-2 text-lg font-medium text-gray-600 uppercase">
            {product.name}
          </h3>
        </div>
      </a>
    </Link>
  );
};

const TeaserCatalogue = ({ products }: TeaserCatalogueProps) => {
  return (
    <div className={s.root}>
      {products.map((product) => (
        <Card key={product._id} product={product} />
      ))}
    </div>
  );
};

export default TeaserCatalogue;
