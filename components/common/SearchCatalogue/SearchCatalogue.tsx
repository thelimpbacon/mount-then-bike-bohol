import Image from "next/image";
import Link from "next/link";
import { SearchProductType } from "utils/types/types";
import s from "./SearchCatalogue.module.css";
import cn from "classnames";

interface CardProps {
  product: SearchProductType;
}

interface SearchCatalogueProps {
  products: Array<SearchProductType>;
}

const Card = ({ product }: CardProps) => {
  return (
    <Link href={`/products/${product._id}`}>
      <a className={s.rootCard}>
        <Image
          className="object-cover w-full h-auto rounded-t-lg"
          alt={product.mainImage.filename}
          src={product.mainImage?.url}
          height={200}
          width={300}
          layout="responsive"
          quality="85"
        />
        <div className="px-4 py-2">
          <h3 className="my-2 text-lg font-medium text-gray-600 uppercase">
            {product.highlights?.name?.length > 0
              ? product.highlights.name.map((n, i) => {
                  return (
                    <span
                      key={Math.random() + i}
                      className={cn({ "bg-yellow-200": n.type === "hit" })}
                    >
                      {n.value}
                    </span>
                  );
                })
              : product.name}
          </h3>
        </div>
      </a>
    </Link>
  );
};

const SearchCatalogue = ({ products }: SearchCatalogueProps) => {
  return (
    <div className={s.root}>
      {products.map((product) => (
        <Card key={product._id} product={product} />
      ))}
    </div>
  );
};

export default SearchCatalogue;
