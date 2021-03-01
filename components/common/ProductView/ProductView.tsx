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
      <div className="w-full bg-gray-200 lg:rounded-md lg:my-0 lg:px-1 lg:w-2/3">
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
      <div className="w-full px-5 mt-5 lg:w-1/3 lg:mt-0 ">
        <div className="my-3 text-3xl font-semibold lg:text-4xl">{name}</div>
        <div className="my-4 text-xl ">
          {new Intl.NumberFormat("en-PH", {
            style: "currency",
            currency: "Php",
          }).format(price)}
        </div>
        <p className="mt-6 whitespace-pre-wrap">{description}</p>
      </div>
    </div>
  );
};

export default Product;
