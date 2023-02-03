import { ReactNode } from "react";

import MainNavigation from "./MainNavigation";

interface RootLayoutProps {
  children: ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <MainNavigation />
      <main>{children}</main>
    </>
  );
}

export default RootLayout;
