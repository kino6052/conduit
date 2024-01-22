import React from "react";
import { Navbar } from "./components/Navbar";
import { EPage, TAppProps } from "./types";
import { pagesMap } from "./utils/pagesMap";
import { HomePage } from "./pages/HomePage/HomePage";
import { ArticlePage } from "./pages/ArticlePage/ArticlePage";

pagesMap.set(EPage.Home, HomePage);
pagesMap.set(EPage.Article, ArticlePage);

export const App: React.FC<TAppProps> = ({ page, pageProps }) => {
  const Page = pagesMap.get(page);

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
