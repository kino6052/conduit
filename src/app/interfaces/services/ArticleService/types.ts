import { IArticle } from "../../../entities/components/Article/types";
import { ETab } from "../../../entities/pages/ArticlePreviewPage/constants";

/** Purpose: Connects page with data */
export interface IArticleService {
  publish(
    articleId: string,
    title: string,
    description: string,
    tags: string[],
  ): Promise<void>;

  submitComment(value: string, id: string): Promise<void>;

  delete(id: string): Promise<void>;

  prepareArticle(articleId: string): Promise<IArticle | undefined>;

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
