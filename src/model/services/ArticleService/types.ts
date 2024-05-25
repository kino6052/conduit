import { IArticle } from "../../components/Article/types";
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
  }>;

  likeArticleById: (id: string) => Promise<number>;

  examineAuthor: (username: string) => Promise<void>;

  readArticle: (articleId: string) => Promise<void>;

  selectTab: (tabId: ETab) => Promise<void>;

  selectTag: (tag: string) => Promise<void>;
}
