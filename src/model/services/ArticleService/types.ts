import { IArticle } from "../../components/Article/types";
import { ISelector } from "../../components/Selector/types";
import { ITab } from "../../components/Tab/types";
import { ETab } from "../../pages/ArticlePreviewPage/constants";

/** Purpose: Connects page with data */
export interface IArticleService {
  getDataForPagination: (
    pageIndex?: number,
    tag?: string,
    username?: string,
  ) => Promise<{
    tags: string[];
    articles: IArticle[];
    numberOfPages: number;
    tabs: { id: string; name: string }[];
  }>;

  likeArticleById: (id: string) => Promise<void>;

  examineAuthor: (username: string) => Promise<void>;

  readArticle: (articleId: string) => Promise<void>;

  selectTab: (tabId: ETab) => Promise<void>;

  selectTag: (tag: string) => Promise<void>;
}
