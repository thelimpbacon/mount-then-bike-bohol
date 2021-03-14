import { Card } from "@components/common";
import { SearchProductType } from "utils/types/types";
import s from "./SearchCatalogue.module.css";

interface SearchCatalogueProps {
  products: Array<SearchProductType>;
}

const SearchCatalogue = ({ products }: SearchCatalogueProps) => {
  return (
    <div className={s.root}>
      {products.map((product) => (
        <Card
          key={product._id}
          _id={product._id}
          name={product.name}
          mainImage={product.mainImage}
          type={product.type}
          highlights={product.highlights}
        />
      ))}
    </div>
  );
};

export default SearchCatalogue;
