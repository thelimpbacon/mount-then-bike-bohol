import { ReactNode } from "react";
import cn from "classnames";
import s from "./Layout.module.css";
import { Navbar } from "@components/common";

interface LayoutProps {
  className?: string;
  children: ReactNode;
  pageProps?: any;
}

const Layout = ({ children }: LayoutProps) => {
  console.log(children);

  return (
    <div className={cn(s.root)}>
      <Navbar />
      <main className="fit">{children}</main>
    </div>
  );
};

export default Layout;
