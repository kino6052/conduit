import { TPageProps } from "./pages/types";

export enum EPage {
  Home = "Home",
  Article = "Article",
  NewPostPage = "NewPostPage",
  Settings = "Settings",
  Profile = "Profile",
}

export type TAppProps = {
  page: EPage;
  pageProps: TPageProps;
};
