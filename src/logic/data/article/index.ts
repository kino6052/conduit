import { uniqueId } from "lodash";
import { TIdMap } from "../../../utils/types";
import { DEFAULT_TIME } from "../../utils/verification";
import { IArticleSource, TArticle } from "./types";
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

export class ArticleDatabase implements IArticleSource {
  public articles: TArticle[] = [DEFAULT_POST];

  public getArticleIds() {
    return Object.keys(this.articles);
  }

  public getDoesArticleExist(id: string) {
    const ids = this.getArticleIds();

    return ids.includes(id);
  }

  public getArticleById(id: string) {
    if (!this.getDoesArticleExist(id)) {
      throw new Error("Article does not exist");
    }

    return this.articles.find(({ id: _id }) => _id === id);
  }

  public getArticles() {
    return Object.values(this.articles);
  }

  public updateArticleById(id: string, partialArticle: Partial<TArticle>) {
    const article = this.getArticleById(id);

    if (!article) return;

    this.articles[id] = {
      ...this.articles[id],
      ...partialArticle,
    };

    return this.articles[id];
  }

  public publishArticle(article: TArticle) {
    if (this.getDoesArticleExist(article.id)) {
      throw new Error("Article already exists");
    }

    this.articles[article.id] = article;
  }

  public getArticlesByTag(tag: string) {
    return this.getArticles().filter(
      (article) => !!article.tags.find((_tag) => _tag === tag),
    );
  }

  public getArticlePaginationTotal({
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

  public getArticlesByPagination({
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

  public getArticlesByUsername(username: string) {
    return this.getArticles().filter(
      (article) => article.username === username,
    );
  }

  public getAllTags() {
    return Array.from(
      new Set(
        this.getArticles()
          .map((article) => article.tags)
          .flat(),
      ),
    );
  }

  public getLikers(id: string) {
    const article = ArticleDatabase.getArticleById(id);

    if (!article) return [];

    return article.likers;
  }

  public updateLikers(id: string, likers: string[]) {
    const article = ArticleDatabase.getArticleById(id);

    if (!article) return;

    this.updateArticleById(id, { likers });
  }

  public likeArticleById(id: string, username: string) {
    const article = this.getArticleById(id);

    const likers = this.getLikers(article.id);

    const hasLiked = likers.find((id) => id === username);

    const nextLikers = [
      ...likers.filter((id) => id !== username),
      !hasLiked && username,
    ].filter(Boolean) as string[];

    this.updateLikers(id, nextLikers);
  }

  public addCommentById(id: string, comment: string, username: string) {
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

  public removeArticleById(id: string) {
    const doesExist = this.getDoesArticleExist(id);

    if (doesExist) {
      delete this.articles[id];
    }
  }
}
