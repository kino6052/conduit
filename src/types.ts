import { TArticlePageProps } from "./io/ui/view/pages/ArticlePage/types";
import { THomePageProps } from "./io/ui/view/pages/HomePage/types";
import { TEditArticlePageProps } from "./io/ui/view/pages/EditArticlePage/types";
import { TProfilePageProps } from "./io/ui/view/pages/ProfilePage/types";
import { TSettingsPageProps } from "./io/ui/view/pages/SettingsPage/types";
import { TSignInPageProps } from "./io/ui/view/pages/SignInPage/types";
import { TSignUpPageProps } from "./io/ui/view/pages/SignUpPage/types";
import { TUserInfoProps } from "./io/ui/view/components/UserInfo/types";
import { TNavbarProps } from "./io/ui/view/components/Navbar/types";

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
  navbarProps: TNavbarProps;
  pageProps: TPagePropsMap[T];
};
