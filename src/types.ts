import { TArticlePageProps } from "./pages/ArticlePage/types";
import { THomePageProps } from "./pages/HomePage/types";
import { TNewPostPageProps } from "./pages/NewPostPage/types";
import { TProfilePageProps } from "./pages/ProfilePage/types";
import { TSettingsPageProps } from "./pages/SettingsPage/types";
import { TSignInPageProps } from "./pages/SignInPage/types";
import { TSignUpPageProps } from "./pages/SignUpPage/types";
import { TPageProps } from "./pages/types";

export enum EPage {
  Home = "Home",
  Article = "Article",
  NewPostPage = "NewPostPage",
  Settings = "Settings",
  Profile = "Profile",
  SignUp = "SignUp",
  SignIn = "SignIn",
}

export type TPagePropsMap = {
  [EPage.Home]: THomePageProps;
  [EPage.Article]: TArticlePageProps;
  [EPage.NewPostPage]: TNewPostPageProps;
  [EPage.Settings]: TSettingsPageProps;
  [EPage.Profile]: TProfilePageProps;
  [EPage.SignUp]: TSignUpPageProps;
  [EPage.SignIn]: TSignInPageProps;
};

export type TAppProps<T extends EPage> = {
  page: T;
  pageProps: TPagePropsMap[T];
};
