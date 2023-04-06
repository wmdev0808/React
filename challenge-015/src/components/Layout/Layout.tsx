import { Fragment, ReactNode } from "react";
import MainHeader from "./MainHeader";

interface LayoutProps {
  children?: ReactNode;
}

function Layout(props: LayoutProps) {
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
