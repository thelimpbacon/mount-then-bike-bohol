import NextHead from "next/head";
import Link from "next/link";
import { ProductType } from "utils/types/types";
import ProductSlider from "../ProductSlider";
import Image from "next/image";
import s from "./ProductView.module.css";
import { Messenger } from "../Icons";
import { seoImages } from "@lib/seoRelated/images";

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

        <div className="flex flex-col w-full px-5 mt-5 lg:w-1/3 lg:mt-0">
          <div>
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

          <div className="my-12 md:my-auto md:py-4">
            <a
              href="http://m.me/mounthenbikebohol"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full p-2 bg-gray-200 rounded-md focus:outline-none md:w-auto">
                <span className="mr-3 text-sm text-gray-600">
                  Connect with us on Messenger
                </span>
                <Messenger className="inline w-8 h-8" />
              </button>
            </a>
          </div>

          <div className="">
            <h5 className="text-sm">Discover more:</h5>
            <div className="grid grid-cols-3">
              <Link href="/bikes">
                <a className={s.links}>
                  <Image
                    className="object-cover w-full h-auto transition duration-500 ease-in-out transform rounded-t-lg hover:scale-105"
                    alt="Spare parts"
                    src={seoImages.bikes}
                    height={50}
                    width={75}
                    layout="responsive"
                    quality="25"
                  />
                  <div className="px-2 py-2 bg-gradient-to-br from-indigo-300 to-indigo-50">
                    <h3 className={s.linksText}>Bicycles</h3>
                  </div>
                </a>
              </Link>

              <Link href="/parts">
                <a className={s.links}>
                  <Image
                    className="object-cover w-full h-auto transition duration-500 ease-in-out transform rounded-t-lg hover:scale-105"
                    alt="Spare parts"
                    src={seoImages.parts}
                    height={50}
                    width={75}
                    layout="responsive"
                    quality="25"
                  />
                  <div className="px-2 py-2 from-purple-200 bg-gradient-to-br to-purple-50">
                    <h3 className={s.linksText}>Parts</h3>
                  </div>
                </a>
              </Link>

              <Link href="/accessories">
                <a className={s.links}>
                  <Image
                    className="object-cover w-full h-auto transition duration-500 ease-in-out transform rounded-t-lg hover:scale-105 "
                    alt="Spare parts"
                    src={seoImages.accessories}
                    height={50}
                    width={75}
                    layout="responsive"
                    quality="25"
                  />
                  <div className="px-2 py-2 from-pink-200 bg-gradient-to-br to-pink-50">
                    <h3 className={s.linksText}>Accessories</h3>
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
