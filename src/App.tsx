import React from "react";
import { Navbar } from "./components/Navbar";
import { ArticlePage } from "./pages/ArticlePage";
import { EditArticlePage } from "./pages/EditArticlePage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { EPage, TAppProps } from "./types";
import { pagesMap } from "./utils/pagesMap";

pagesMap[EPage.Home] = HomePage;
pagesMap[EPage.Article] = ArticlePage;
pagesMap[EPage.NewArticle] = EditArticlePage;
pagesMap[EPage.EditArticle] = EditArticlePage;
pagesMap[EPage.Settings] = SettingsPage;
pagesMap[EPage.Profile] = ProfilePage;
pagesMap[EPage.SignIn] = SignInPage;
pagesMap[EPage.SignUp] = SignUpPage;

export function App<T extends EPage>({
  page,
  pageProps,
  navbarProps,
}: TAppProps<T>): JSX.Element | null {
  const Page = pagesMap[page] as React.FC<typeof pageProps>;

  if (!Page) {
    console.error(
      `Page component for "${page}" not found. Make sure it's added to the map`,
    );
    return null;
  }

  return (
    <>
      <Navbar {...navbarProps} />
      <Page {...pageProps} />
    </>
  );
}
