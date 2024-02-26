import { ArticlePage } from "../pages/ArticlePage";
import { HomePage } from "../pages/HomePage";
import { NewPostPage } from "../pages/NewPostPage";
import { TPageProps } from "../pages/types";
import { EPage } from "../types";

// TODO: Don't unify props, keep them separate, but use class that allows to automatically get props
export type TPagePropsMap = {
  [EPage.Home]: React.FC<TPageProps>;
  [EPage.Article]: React.FC<TPageProps>;
  [EPage.NewPostPage]: React.FC<TPageProps>;
};

export const pagesMap = {} as TPagePropsMap;

pagesMap[EPage.Home] = HomePage;
pagesMap[EPage.Article] = ArticlePage;
pagesMap[EPage.NewPostPage] = NewPostPage;
