import { classNames } from "@ungap/global-this";
import { Facebook, MapPin, Phone } from "../Icons";
import s from "./Footer.module.css";
import cn from "classnames";

const Footer = () => {
  return (
    <div className={s.root}>
      <div className={s.leftContent}>
        <figure className="flex items-center mt-3 lg:hidden">
          <div className="text-center text-white">
            <div className="flex items-center justify-center ">
              <img
                className={cn(s.logo)}
                src="/mtbb.png"
                alt="mount-then-bike-bohol"
              />
            </div>
            <h2 className="mb-1 text-lg font-semibold">
              Mount, then Bike Bohol
            </h2>
            <p className="text-sm lg:text-base">
              We just don't build project bikes. We narrate your awesome biking
              experience.
            </p>
          </div>
        </figure>

        <figure className="items-center hidden lg:flex">
          <img className={s.logo} src="/mtbb.png" alt="mount-then-bike-bohol" />
          <blockquote className="text-left text-white">
            <h2 className="mb-1 text-lg font-semibold">
              Mount, then Bike Bohol
            </h2>
            <p className="text-sm lg:text-base">
              We just don't build project bikes. We narrate your awesome biking
              experience.
            </p>
          </blockquote>
        </figure>
      </div>

      <div className="px-6 lg:pl-20">
        <ul className="text-sm text-center lg:text-left">
          <li className="flex items-center justify-center my-3 text-white lg:justify-start">
            <Facebook className="inline w-6 h-6 mr-2 lg:mb-0" />
            <a
              className="text-blue-400 underline"
              href="https://www.facebook.com/mounthenbikebohol"
              target="_blank"
              rel="noopener noreferrer"
            >
              @mounthenbikebohol
            </a>
          </li>
          <li className="flex items-center justify-center my-5 text-white lg:my-3 lg:justify-start">
            <MapPin className="inline w-8 h-8 mr-1 text-red-400 lg:w-6 lg:h-6 lg:mr-2" />
            <a
              href="http://maps.google.com/?q=9.632839244746611, 123.84036526079736"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="underline">
                Fonacier Circumferential Road, Purok 6, Songculan, Dauis, Bohol
                6339, Philippines
              </span>
            </a>
          </li>
          <li className="flex items-center justify-center mt-5 mb-3 overflow-x-visible text-white lg:my-3 lg:justify-start">
            <Phone className="inline w-6 h-6 mr-2 text-green-400" />
            <span className="lg:inline-flex lg:space-x-3 ">
              <div className="">+63 950 609 8165</div>
              <div className="lg:mx-3 lg:border-l-2 lg:border-r-2 lg:px-3">
                +63 915 727 8217
              </div>
              <div className="">+63 917 154 7303</div>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
