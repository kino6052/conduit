import { TNewPostPageProps } from "./pages/NewPostPage/types";
import { TPageProps } from "./pages/types";

export enum EPage {
  Home = "Home",
  Article = "Article",
  NewPostPage = "NewPostPage",
}

export type TCommonPageProps = TPageProps | TNewPostPageProps;

export type TAppProps<T extends TCommonPageProps> = {
  page: EPage;
  pageProps: T;
};

export const getIsNewPostPage = (
  props: TAppProps<TCommonPageProps>,
  pageProps: TCommonPageProps,
): pageProps is TNewPostPageProps => {
  return props.page === EPage.NewPostPage;
};
