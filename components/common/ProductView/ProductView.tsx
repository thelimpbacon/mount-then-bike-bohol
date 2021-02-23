import { ProductType } from "utils/types/types";
import ProductSlider from "../ProductSlider";
import Image from "next/image";
import s from "./ProductView.module.css";

const Product = ({
  name,
  price,
  description,
  mainImage,
  secondaryImage,
}: ProductType) => {
  return (
    <div className={s.root}>
      <div className="w-full bg-gray-200 lg:rounded-md lg:my-1 lg:px-1 lg:w-2/3">
        <ProductSlider>
          {[...[mainImage], ...secondaryImage]?.map((data, i) => (
            <div key={data.public_id} className="lg:p-1 ">
              <Image
                className="object-contain"
                alt={data.filename}
                src={data.url}
                height={140}
                width={200}
                layout="responsive"
                priority={i === 0}
                quality="85"
              />
            </div>
          ))}
        </ProductSlider>
      </div>
      <div className="w-full px-5 my-1 lg:w-1/3 lg:py-20">
        <div className="my-3 text-2xl font-semibold">{name}</div>
        <span className="my-4 text-xl ">
          {price.toLocaleString("en-GB", {
            style: "currency",
            currency: "Php",
          })}
        </span>
        <div className="mt-6 whitespace-pre-wrap">{description}</div>
      </div>
    </div>
  );
};

export default Product;
