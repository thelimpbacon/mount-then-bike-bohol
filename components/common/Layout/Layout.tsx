import { ReactNode } from "react";
import Link from "next/link";
import cn from "classnames";
import s from "./Layout.module.css";
import { Footer, Navbar } from "@components/common";

interface LayoutProps {
  className?: string;
  children: ReactNode;
  pageProps?: any;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={cn(s.root)}>
      <Navbar />
      <main className="fit">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
