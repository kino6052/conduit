import { TPageProps } from "../pages/types";
import { EPage } from "../types";
import { HomePage } from '../pages/HomePage'
import { ArticlePage } from '../pages/ArticlePage'

export const pagesMap = new Map<EPage, React.FC<TPageProps>>();

pagesMap.set(EPage.Home, HomePage);
pagesMap.set(EPage.Article, ArticlePage);