import Link from "next/link";
import Image from "next/image";
import cn from "classnames";
import { Bike, Chainset, Helmet } from "@components/common/Icons";
import { ImageField } from "utils/types/types";
import s from "./Card.module.css";

interface CardProps {
  _id: string;
  name: string;
  mainImage: ImageField;
  type: "Bikes" | "Parts" | "Accesories";
  highlights?: {
    name: { value: string; type: "text" | "hit" }[];
  };
}

const IconContainer = ({ type }: { type: string }) => {
  if (type === "Bikes") {
    return (
      <div className="absolute right-0 z-10 px-1 bg-gray-500 shadow-md bg-opacity-30">
        <Bike className="w-8 h-8 text-gray-200 lg:w-10 lg:h-10" />
      </div>
    );
  }
  if (type === "Parts") {
    return (
      <div className="absolute right-0 z-10 px-1 bg-gray-500 shadow-md bg-opacity-30">
        <Chainset className="w-8 h-8 text-gray-200 lg:w-10 lg:h-10" />
      </div>
    );
  }
  if (type === "Accessories") {
    return (
      <div className="absolute right-0 z-10 px-1 bg-gray-500 shadow-md bg-opacity-30">
        <Helmet className="w-8 h-8 text-gray-200 lg:w-10 lg:h-10" />
      </div>
    );
  }

  return null;
};

const Card = ({ _id, name, mainImage, type, highlights }: CardProps) => {
  return (
    <Link href={`/products/${_id}`}>
      <a className={s.root}>
        <IconContainer type={type} />
        <Image
          className={s.image}
          alt={mainImage.filename}
          src={mainImage?.url}
          height={200}
          width={300}
          layout="responsive"
          quality="85"
        />
        <div className="p-1 lg:px-4 lg:py-2 h-14 lg:h-auto ">
          <h3 className={s.name}>
            {highlights?.name?.length > 0
              ? highlights.name.map((n, i) => {
                  return (
                    <span
                      key={Math.random() + i}
                      className={cn({ "bg-yellow-200": n.type === "hit" })}
                    >
                      {n.value}
                    </span>
                  );
                })
              : name}
          </h3>
        </div>
      </a>
    </Link>
  );
};

export default Card;
