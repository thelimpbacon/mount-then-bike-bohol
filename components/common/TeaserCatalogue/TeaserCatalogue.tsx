import { Card } from "@components/common";
import { ProductType } from "utils/types/types";
import s from "./TeaserCatalogue.module.css";

interface TeaserCatalogueProps {
  products: Array<ProductType>;
}

const TeaserCatalogue = ({ products }: TeaserCatalogueProps) => {
  return (
    <div className={s.root}>
      {products.map((product) => (
        <Card
          key={product._id}
          _id={product._id}
          name={product.name}
          mainImage={product.mainImage}
          type={product.type}
        />
      ))}
    </div>
  );
};

export default TeaserCatalogue;
