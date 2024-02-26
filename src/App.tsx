import React from "react";
import { Navbar } from "./components/Navbar";
import { TAppProps } from "./types";
import { pagesMap } from "./utils/pagesMap";

export const App: React.FC<TAppProps> = ({ page, pageProps }) => {
  const Page = pagesMap[page];

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
};
