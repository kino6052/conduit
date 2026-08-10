import { IArticle } from "../../../entities/components/Article/types";
import { ETab } from "../../../entities/pages/ArticlePreviewPage/constants";
import { IArticleData } from "../../data/ArticleDAO/types";
export interface IArticleManagementService {
  publish(
    articleId: string,
    title: string,
    description: string,
    tags: string[],
  ): Promise<void>;

  delete(id: string): Promise<void>;
}

export interface IArticlePreparationService {
  prepareArticle(articleId: string): Promise<IArticle | undefined>;
  prepareArticleSync(articleData: IArticleData): IArticle;
}

export interface IArticleCommentService {
  submitComment(value: string, id: string): Promise<void>;
}

export interface IArticlePaginationService {
  getDataForPagination: (
    pageIndex?: number,
    tag?: string,
    username?: string,
  ) => Promise<{
    tags: string[];
    articles: IArticle[];
    numberOfPages: number;
  }>;
}

export interface IArticleLikeService {
  likeArticleById(id: string): Promise<number>;
}

export interface ITabTagSelectionService {
  selectTab(tabId: ETab): Promise<void>;
  selectTag(tag: string): Promise<void>;
}

export interface IAuthorExaminationService {
  examineAuthor(username: string): Promise<void>;
}

export interface IArticleReadingService {
  readArticle(articleId: string): Promise<void>;
}

export type IArticleService = IArticleManagementService &
  IArticleCommentService &
  IArticlePreparationService &
  IArticlePaginationService &
  IArticleLikeService &
  IAuthorExaminationService &
  IArticleReadingService &
  ITabTagSelectionService;
