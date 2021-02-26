import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "../Icons";
import s from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={s.root}>
      <div className={s.leftContent}>
        <img className={s.logo} src="/mtbb.png" alt="mount-then-bike-bohol" />
        <div className="text-center text-white lg:text-left ">
          <div className="mb-1 font-semibold">Mount, then Bike Bohol </div>
          <p className="text-sm">
            The newest and most affordable bikes available on the market have
            invaded Bohol.
          </p>
          <p className="hidden mt-2 text-sm lg:block">
            More writings here.Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      <div className="pt-3 lg:pt-0 lg:pl-20">
        <ul className="text-sm text-center lg:text-left">
          <li>
            <a
              href="https://www.facebook.com/mounthenbikebohol"
              target="_blank"
            >
              <Facebook className="inline w-10 h-10 " />
            </a>
            <Instagram className="inline w-10 h-10 mx-6" />
            <Twitter className="inline w-10 h-10" />
          </li>
          <li className="mt-5 mb-3 text-white">
            <MapPin className="inline w-6 h-6 mr-2 text-red-400" />
            <a
              href="https://www.google.com/maps/search/Km.+14,+Central+Highway,+Bil-isan+6340+Panglao,+Philippines/@9.9665635,124.0302112,14.09z"
              target="_blank"
            >
              <span className="underline">
                Km. 14, Central Highway, Bil-isan 6340 Panglao, Philippines
              </span>
            </a>
          </li>
          <li className="my-3 text-white">
            <Phone className="inline w-6 h-6 mr-2 text-green-400" />
            <span>+63 950 609 8165</span>
          </li>
          <li className="my-3 text-white">
            <Mail className="inline w-6 h-6 mr-2 text-blue-400" />
            <span>sample-mount-then-bike-bohol@gmail.com</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
