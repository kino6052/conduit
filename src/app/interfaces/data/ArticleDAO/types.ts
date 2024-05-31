export interface IArticleData {
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
    date?: string;
  }[];
}

// CRUD Operations for Articles
export interface IArticleCRUD {
  getArticleIds: () => Promise<string[]>;
  getDoesArticleExist: (id: string) => Promise<boolean>;
  getArticleById: (id: string) => Promise<IArticleData | undefined>;
  getArticles: () => Promise<IArticleData[]>;
  updateArticleById: (
    id: string,
    partialArticle: Partial<IArticleData>,
  ) => Promise<IArticleData | undefined>;
  publishArticle: (article: {
    title: string;
    description: string;
    tags: string[];
    username: string;
  }) => Promise<IArticleData>;
  removeArticleById: (id: string) => Promise<void>;
}

// Selector Operations for Articles
export interface IArticleSelectors {
  getArticlesByTag: (tag: string) => Promise<IArticleData[]>;
  getArticlePaginationTotal: (input: {
    index?: number;
    articlesPerPage?: number;
    tag?: string;
    username?: string;
  }) => Promise<number>;
  getArticlesByPagination: (input: {
    index?: number;
    articlesPerPage?: number;
    tag?: string;
    username?: string;
  }) => Promise<IArticleData[]>;
  getArticlesByUsername: (username: string) => Promise<IArticleData[]>;
  getAllTags: () => Promise<string[]>;
}

// Like Operations for Articles
export interface IArticleLikes {
  getLikers: (id: string) => Promise<string[]>;
  updateLikers: (id: string, likers: string[]) => Promise<void>;
  likeArticleById: (id: string, username: string) => Promise<void>;
}

// Comment Operations for Articles
export interface IArticleComments {
  addCommentById: (
    id: string,
    comment: string,
    username: string,
  ) => Promise<IArticleData | undefined>;
}

// Combining all interfaces into a single type for convenience
export type IArticleDAO = IArticleCRUD &
  IArticleSelectors &
  IArticleLikes &
  IArticleComments;
