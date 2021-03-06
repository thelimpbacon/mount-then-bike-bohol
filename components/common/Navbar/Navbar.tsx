import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import cn from "classnames";
import throttle from "lodash.throttle";
import { Searchbar } from "@components/common";
import s from "./Navbar.module.css";

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
        "bg-black bg-opacity-80": hasScrolled || pathname !== "/",
      })}
    >
      <div className="relative flex flex-row justify-between align-center md:py-3">
        <div className="flex items-center justify-between flex-1 lg:justify-start">
          <Link href="/">
            <a className={s.logo} aria-label="Logo">
              <img
                className="w-8 h-8 rounded-full"
                src="/mtbb.png"
                alt="Mount, then bike Bohol logo"
              />
            </a>
          </Link>

          <nav className="space-x-2 lg:ml-6 lg:space-x-4">
            <Link href="/bikes">
              <a className={cn(s.link, { "text-black": !hasScrolled })}>
                Bikes
              </a>
            </Link>
            <Link href="/parts">
              <a
                className={cn(
                  s.link,
                  "border-l border-r border-opacity-40 px-2 lg:px-4",
                  {
                    "text-black border-black border-l border-r border-opacity-40 px-2 lg:px-4": !hasScrolled,
                  }
                )}
              >
                Parts
              </a>
            </Link>
            <Link href="/accessories">
              <a className={cn(s.link, { "text-black": !hasScrolled })}>
                Accessories
              </a>
            </Link>
          </nav>
        </div>

        <div className="justify-end flex-1 hidden lg:flex lg:justify-center">
          <Searchbar />
        </div>

        <div className="justify-end flex-1 hidden space-x-8 lg:flex">
          {/* Night mode toggle here */}
        </div>
      </div>
      <div className="flex flex-1 pt-3 lg:hidden">
        <Searchbar id="mobile" />
      </div>
    </div>
  );
};

export default Navbar;
