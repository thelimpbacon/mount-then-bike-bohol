import { useState, useEffect } from "react";
import Link from "next/link";
import s from "./Navbar.module.css";
import cn from "classnames";
import throttle from "lodash.throttle";
import { Searchbar } from "@components/common";

const Navbar = () => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <div className={cn(s.root, { "shadow-magical": hasScrolled })}>
      <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
        <div className="flex items-center flex-1">
          <Link href="/">
            <a className={s.logo} aria-label="Logo">
              <img className="h-8 w-8 rounded-sm" src="/mtbb.png" />
            </a>
          </Link>
          <nav className="hidden ml-6 space-x-4 lg:block">
            <Link href="/">
              <a className={s.link}>All</a>
            </Link>
            <Link href="/">
              <a className={s.link}>Bikes</a>
            </Link>
            <Link href="/">
              <a className={s.link}>Accessories</a>
            </Link>
          </nav>
        </div>

        <div className="justify-center flex-1 hidden lg:flex">
          <Searchbar />
        </div>

        <div className="flex justify-end flex-1 space-x-8">
          {/* Night mode toggle here */}
        </div>
      </div>

      <div className="flex pb-4 lg:px-6 lg:hidden">
        <Searchbar id="mobile-search" />
      </div>
    </div>
  );
};

export default Navbar;
