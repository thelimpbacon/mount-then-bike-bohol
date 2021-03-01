import { ProductSlider } from "@components/common";
import Image from "next/image";
import s from "./Banner.module.css";

interface BannerProps {
  picsUrl: Array<{ name: string; url: string }>;
}

const Banner = ({ picsUrl }: BannerProps) => {
  return (
    <div className={s.carousel}>
      <ProductSlider>
        {picsUrl.map((pic, i) => (
          <div key={pic.name} className={s.imageContainer}>
            <Image
              className={s.img}
              alt={pic.name}
              src={pic.url}
              height={600}
              width={1000}
              layout="responsive"
              priority={i === 0}
              quality="85"
            />
          </div>
        ))}
      </ProductSlider>
    </div>
  );
};

export default Banner;
