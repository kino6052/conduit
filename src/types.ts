import { TPageProps } from "./pages/types";

export enum EPage {
  Home = "Home",
  Article = "Article",
}

export type TAppProps = {
  page: EPage;
  pageProps: TPageProps;
};
