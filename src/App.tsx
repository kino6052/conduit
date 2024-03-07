import React from "react";
import { Navbar } from "./components/Navbar";
import { EPage, TPagePropsMap } from "./types";
import { pagesMap } from "./utils/pagesMap";

export function App<T extends EPage>({
  page,
  pageProps,
}: {
  page: T;
  pageProps: TPagePropsMap[T];
}): JSX.Element | null {
  const Page = pagesMap[page] as React.FC<typeof pageProps>;

  if (!Page) {
    console.error(
      `Page component for "${page}" not found. Make sure it's added to the map`,
    );
    return null;
  }

  return (
    <div className="page-default">
      <Navbar username="eni9mu5" />
      <Page {...pageProps} />
    </div>
  );
}
