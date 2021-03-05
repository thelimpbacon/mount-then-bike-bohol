import { useState, useEffect } from "react";
import Link from "next/link";
import s from "./Navbar.module.css";
import cn from "classnames";
import throttle from "lodash.throttle";
import { Searchbar } from "@components/common";
import { useRouter } from "next/router";

const Navbar = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }
    const handleScroll = throttle(() => {
      const offset = 0;
      const { scrollTop } = document.documentElement;
      const scrolled = scrollTop > offset;
      setHasScrolled(scrolled);
    }, 200);

    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return (
    <div
      className={cn(s.root, {
        "bg-black opacity-80": hasScrolled || pathname !== "/",
      })}
    >
      <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
        <div className="flex items-center flex-1">
          <Link href="/">
            <a className={s.logo} aria-label="Logo">
              <img
                className="w-8 h-8 rounded-full"
                src="/mtbb.png"
                alt="Mount, then bike Bohol logo"
              />
            </a>
          </Link>
          <nav className="hidden ml-6 space-x-4 lg:block ">
            <Link href="/bikes">
              <a className={s.link}>Bikes</a>
            </Link>
            <Link href="/parts">
              <a
                className={cn(
                  s.link,
                  "border-l border-r border-gray-200 border-opacity-40 px-4"
                )}
              >
                Spare Parts
              </a>
            </Link>
            <Link href="/accesories">
              <a className={s.link}>Accessories</a>
            </Link>
          </nav>
        </div>

        <div className="flex justify-end flex-1 lg:justify-center">
          <Searchbar />
        </div>

        <div className="justify-end flex-1 hidden space-x-8 lg:flex">
          {/* Night mode toggle here */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
