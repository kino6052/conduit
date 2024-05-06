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
  }[];
}

export interface IArticleDAO {
  // Article CRUD
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
  }) => Promise<void>;

  // Selectors
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

  getLikers: (id: string) => Promise<string[]>;

  updateLikers: (id: string, likers: string[]) => Promise<void>;

  likeArticleById: (id: string, username: string) => Promise<void>;

  addCommentById: (
    id: string,
    comment: string,
    username: string,
  ) => Promise<IArticleData | undefined>;

  removeArticleById: (id: string) => Promise<void>;
}
