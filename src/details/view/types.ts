import { EPage } from "../../../app/pages/types";
import { TWithOnMountHandler } from "../../utils/types";
import { TNavbarProps } from "./components/Navbar/types";
import { TArticlePageProps } from "./pages/ArticlePage/types";
import { TEditArticlePageProps } from "./pages/EditArticlePage/types";
import { THomePageProps } from "./pages/HomePage/types";
import { TProfilePageProps } from "./pages/ProfilePage/types";
import { TSettingsPageProps } from "./pages/SettingsPage/types";
import { TSignInPageProps } from "./pages/SignInPage/types";
import { TSignUpPageProps } from "./pages/SignUpPage/types";

export type TPagePropsMap = {
  [EPage.Home]: THomePageProps;
  [EPage.Article]: TArticlePageProps;
  [EPage.EditArticle]: TEditArticlePageProps;
  [EPage.NewArticle]: TEditArticlePageProps;
  [EPage.Settings]: TSettingsPageProps;
  [EPage.Profile]: TProfilePageProps;
  [EPage.SignUp]: TSignUpPageProps;
  [EPage.SignIn]: TSignInPageProps;
  [EPage.Loading]: TWithOnMountHandler<{}>;
};

export type TAppProps<T extends EPage> = {
  page: T;
  navbarProps?: TNavbarProps;
  pageProps: TPagePropsMap[T];
  onMount?: () => Promise<void>;
};
