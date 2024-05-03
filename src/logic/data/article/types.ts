import { TIdMap } from "../../../utils/types";

export type TArticle = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  likers: string[];
  username: string;
  date: string;
  comments: {
    id: string;
    text: string;
    username?: string;
  }[];
};

export interface IArticleSource {
  // Article CRUD
  articles: TArticle[];

  getArticleIds: () => string[];

  getDoesArticleExist: (id: string) => boolean;

  getArticleById: (id: string) => TArticle | undefined;

  getArticles: () => TArticle[];

  updateArticleById: (id: string, partialArticle: Partial<TArticle>) => void;

  publishArticle: (article: TArticle) => void;

  // Selectors
  getArticlesByTag: (tag: string) => TArticle[];

  getArticlePaginationTotal: (input: {
    index?: number;
    articlesPerPage?: number;
    tag?: string;
    username?: string;
  }) => number;

  getArticlesByPagination: (input: {
    index?: number;
    articlesPerPage?: number;
    tag?: string;
    username?: string;
  }) => TArticle[];

  getArticlesByUsername: (username: string) => TArticle[];

  getAllTags: () => string[];

  getLikers: (id: string) => string[];

  updateLikers: (id: string, likers: string[]) => void;

  likeArticleById: (id: string, username: string) => void;

  addCommentById: (id: string, comment: string, username: string) => TArticle;

  removeArticleById: (id: string) => void;
}
