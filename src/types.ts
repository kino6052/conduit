import { TArticlePageProps } from "./pages/ArticlePage/types";
import { THomePageProps } from "./pages/HomePage/types";
import { TEditArticlePageProps } from "./pages/EditArticlePage/types";
import { TProfilePageProps } from "./pages/ProfilePage/types";
import { TSettingsPageProps } from "./pages/SettingsPage/types";
import { TSignInPageProps } from "./pages/SignInPage/types";
import { TSignUpPageProps } from "./pages/SignUpPage/types";

export enum EPage {
  Home = "Home",
  Article = "Article",
  NewArticle = "NewArticle",
  EditArticle = "EditArticle",
  Settings = "Settings",
  Profile = "Profile",
  SignUp = "SignUp",
  SignIn = "SignIn",
}

export type TPagePropsMap = {
  [EPage.Home]: THomePageProps;
  [EPage.Article]: TArticlePageProps;
  [EPage.EditArticle]: TEditArticlePageProps;
  [EPage.NewArticle]: TEditArticlePageProps;
  [EPage.Settings]: TSettingsPageProps;
  [EPage.Profile]: TProfilePageProps;
  [EPage.SignUp]: TSignUpPageProps;
  [EPage.SignIn]: TSignInPageProps;
};

export type TAppProps<T extends EPage> = {
  page: T;
  pageProps: TPagePropsMap[T];
};
