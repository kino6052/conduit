import { uniqueId } from "lodash";
import { TIdMap } from "../../../utils/types";
import { DEFAULT_TIME } from "../../utils/verification";
import { TArticle } from "./types";
import { EArticleDatabaseConstant } from "./constants";

const DEFAULT_POST: TArticle = {
  id: "post-1",
  username: "jane-lobster",
  description: "A good article, a really really good one",
  likers: [],
  tags: ["1", "2", "3"],
  title: "A good thing",
  date: new Date(DEFAULT_TIME).toDateString(),
  comments: [],
};

export class ArticleDatabase {
  private static articles: TIdMap<TArticle> = new Array(100)
    .fill(null)
    .map((_, i) => `${i}`)
    .reduce((acc, id) => {
      return {
        ...acc,
        [id]: { ...DEFAULT_POST, id, title: `${id}: ${DEFAULT_POST.title}` },
      };
    }, {} as TIdMap<TArticle>);

  public static getArticleIds() {
    return Object.keys(this.articles);
  }

  public static getDoesArticleExist(id: string) {
    const ids = this.getArticleIds();

    return ids.includes(id);
  }

  public static getArticleById(id: string) {
    if (!this.getDoesArticleExist(id)) {
      throw new Error("Article does not exist");
    }

    return this.articles[id];
  }

  public static getArticles() {
    return Object.values(this.articles);
  }

  public static updateArticleById(
    id: string,
    partialArticle: Partial<TArticle>,
  ) {
    const article = this.getArticleById(id);

    if (!article) return;

    this.articles[id] = {
      ...this.articles[id],
      ...partialArticle,
    };

    return this.articles[id];
  }

  public static publishArticle(article: TArticle) {
    if (this.getDoesArticleExist(article.id)) {
      throw new Error("Article already exists");
    }

    this.articles[article.id] = article;
  }

  public static getArticlesByTag(tag: string) {
    return this.getArticles().filter(
      (article) => !!article.tags.find((_tag) => _tag === tag),
    );
  }

  public static getArticlePaginationTotal({
    tag,
    username,
  }: {
    index?: number;
    articlesPerPage?: number;
    tag?: string;
    username?: string;
  }) {
    const articles = ArticleDatabase.getArticlesByPagination({
      articlesPerPage: Number.MAX_SAFE_INTEGER,
      tag,
      username,
    });
    return Math.ceil(
      articles.length / EArticleDatabaseConstant.ArticlesPerPage,
    );
  }

  public static getArticlesByPagination({
    index = 0,
    articlesPerPage = EArticleDatabaseConstant.ArticlesPerPage,
    tag,
    username,
  }: {
    index?: number;
    articlesPerPage?: number;
    tag?: string;
    username?: string;
  }) {
    return this.getArticles()

      .filter((article) => {
        if (!tag || !!username) return article;

        return !!article.tags.find((_tag) => _tag === tag);
      })
      .filter((article) => {
        if (!username) return article;

        return article.username === username;
      })
      .filter((_, i) => {
        const low = articlesPerPage * index;
        const high = low + articlesPerPage;

        return i >= low && i < high;
      });
  }

  public static getArticlesByUsername(username: string) {
    return this.getArticles().filter(
      (article) => article.username === username,
    );
  }

  public static getAllTags() {
    return Array.from(
      new Set(
        this.getArticles()
          .map((article) => article.tags)
          .flat(),
      ),
    );
  }

  public static getLikers(id: string) {
    const article = ArticleDatabase.getArticleById(id);

    if (!article) return [];

    return article.likers;
  }

  public static updateLikers(id: string, likers: string[]) {
    const article = ArticleDatabase.getArticleById(id);

    if (!article) return;

    this.updateArticleById(id, { likers });
  }

  public static likeArticleById(id: string, username: string) {
    const article = this.getArticleById(id);

    const likers = this.getLikers(article.id);

    const hasLiked = likers.find((id) => id === username);

    const nextLikers = [
      ...likers.filter((id) => id !== username),
      !hasLiked && username,
    ].filter(Boolean) as string[];

    this.updateLikers(id, nextLikers);
  }

  public static addCommentById(id: string, comment: string, username: string) {
    const article = this.getArticleById(id);

    this.updateArticleById(id, {
      comments: [
        {
          id: uniqueId(),
          text: comment,
          username,
        },
        ...article.comments,
      ],
    });

    return this.getArticleById(id);
  }

  public static removeArticleById(id: string) {
    const doesExist = this.getDoesArticleExist(id);

    if (doesExist) {
      delete this.articles[id];
    }
  }
}
