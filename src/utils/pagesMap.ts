import { TPageProps } from "../pages/types";
import { EPage } from "../types";
import { HomePage } from "../pages/HomePage";
import { ArticlePage } from "../pages/ArticlePage";
import { NewPostPage } from "../pages/NewPostPage";
import { TNewPostPageProps } from "../pages/NewPostPage/types";

export type TPagePropsMap = {
  [EPage.Home]: React.FC<TPageProps>;
  [EPage.Article]: React.FC<TPageProps>;
  [EPage.NewPostPage]: React.FC<TNewPostPageProps>;
};

export const pagesMap = {} as TPagePropsMap;

pagesMap[EPage.Home] = HomePage;
pagesMap[EPage.Article] = ArticlePage;
pagesMap[EPage.NewPostPage] = NewPostPage;
