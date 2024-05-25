import React from "react";
import { EPage } from "../../../model/pages/types";
import { pagesMap as pagesComponentMap } from "../../../utils/pagesMap";
import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import { ArticlePage } from "./pages/ArticlePage";
import { EditArticlePage } from "./pages/EditArticlePage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { TAppProps } from "./types";

pagesComponentMap[EPage.Home] = HomePage;
pagesComponentMap[EPage.Article] = ArticlePage;
pagesComponentMap[EPage.NewArticle] = EditArticlePage;
pagesComponentMap[EPage.EditArticle] = EditArticlePage;
pagesComponentMap[EPage.Settings] = SettingsPage;
pagesComponentMap[EPage.Profile] = ProfilePage;
pagesComponentMap[EPage.SignIn] = SignInPage;
pagesComponentMap[EPage.SignUp] = SignUpPage;
pagesComponentMap[EPage.Loading] = Loader;

export function App<T extends EPage>(props: TAppProps<T>): JSX.Element | null {
  const  {
    page,
    pageProps,
    navbarProps,
  } = props; 
  
  const Page = pagesComponentMap[page] as React.FC<typeof pageProps>;

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
