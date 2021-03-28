import { Facebook, MapPin, Phone } from "../Icons";
import s from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={s.root}>
      <div className={s.leftContent}>
        <figure className="flex items-center">
          <img className={s.logo} src="/mtbb.png" alt="mount-then-bike-bohol" />
          <blockquote className="text-left text-white">
            <h2 className="mb-1 text-lg font-semibold">
              Mount, then Bike Bohol
            </h2>
            <p className="text-sm lg:text-base">
              The newest and most affordable bikes available on the market have
              invaded Bohol.
            </p>
          </blockquote>
        </figure>
      </div>

      <div className="pt-3 lg:pt-0 lg:pl-20">
        <ul className="text-sm text-center lg:text-left">
          <li>
            <Facebook className="inline w-6 h-6 mr-2" />
            <a
              className="text-blue-400 underline"
              href="https://www.facebook.com/mounthenbikebohol"
              target="_blank"
              rel="noopener noreferrer"
            >
              @mounthenbikebohol
            </a>
          </li>
          <li className="my-3 text-white">
            <MapPin className="inline w-6 h-6 mr-2 text-red-400" />
            <a
              href="http://maps.google.com/?q=9.632839244746611, 123.84036526079736"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="underline">
                Fonacier Circumferential Road, Purok 6, Songculan, Dauis, Bohol,
                6339
              </span>
            </a>
          </li>
          <li className="my-3 text-white">
            <Phone className="inline w-6 h-6 mr-2 text-green-400" />
            <span>+63 950 609 8165</span>
            <span className="px-3 mx-3 border-l-2 border-r-2">
              +63 915 727 8217
            </span>
            <span>+63 917 154 7303</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
