import NextHead from "next/head";
import { ProductType } from "utils/types/types";
import ProductSlider from "../ProductSlider";
import Image from "next/image";
import s from "./ProductView.module.css";

const Header = ({
  _id,
  name,
  description,
  mainImage,
  secondaryImage,
}: ProductType) => {
  return (
    <NextHead>
      <meta property="og:title" content={name} key={`product-title-${_id}`} />
      <meta property="og:type" content="website" key={`product-type-${_id}`} />
      <meta
        property="og:url"
        content={`${process.env.NEXT_PUBLIC_SITE_URL}/products/${_id}`}
        key={`product-url-${_id}`}
      />
      <meta
        property="og:description"
        content={description}
        key={`product-description-${_id}`}
      />
      <meta
        property="og:image"
        content={mainImage.url}
        key={`product-image-${_id}`}
      />
    </NextHead>
  );
};

const Product = (props: ProductType) => {
  return (
    <>
      <Header {...props} />

      <div className={s.root}>
        <div className="w-full bg-gray-200 lg:rounded-md lg:my-0 lg:px-1 lg:w-2/3">
          <ProductSlider>
            {[...[props.mainImage], ...props.secondaryImage]?.map((data, i) => (
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
          <div className="my-3 text-3xl font-semibold lg:text-4xl">
            {props.name}
          </div>
          <div className="my-4 text-xl ">
            {new Intl.NumberFormat("en-PH", {
              style: "currency",
              currency: "Php",
            }).format(props.price)}
          </div>
          <p className="mt-6 whitespace-pre-wrap">{props.description}</p>
        </div>
      </div>
    </>
  );
};

export default Product;
