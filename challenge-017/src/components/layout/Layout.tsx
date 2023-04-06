import { Fragment, ReactNode } from "react";

import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

interface LayoutProps {
  children?: ReactNode;
}

function Layout(props: LayoutProps) {
  return (
    <Fragment>
      <MainNavigation />
      <main className={classes.main}>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
