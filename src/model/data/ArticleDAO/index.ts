import { uniqueId } from "lodash";
import { DEFAULT_TIME } from "../../../logic/utils/verification";
import { EArticleDatabaseConstant } from "./constants";
import { IArticleData, IArticleDAO } from "./types";

const DEFAULT_POST: IArticleData = {
  id: "post-1",
  username: "jane-lobster",
  description: "A good article, a really really good one",
  likers: [],
  tags: ["1", "2", "3"],
  title: "A good thing",
  date: new Date(DEFAULT_TIME).toDateString(),
  comments: [],
};

export class ArticleDAOTestDouble implements IArticleDAO {
  private articles: IArticleData[] = [DEFAULT_POST];

  public async getArticleIds() {
    return Object.keys(this.articles);
  }

  public async getDoesArticleExist(id: string) {
    const ids = await this.getArticleIds();

    return ids.includes(id);
  }

  public async getArticleById(id: string) {
    if (!this.getDoesArticleExist(id)) {
      throw new Error("Article does not exist");
    }

    return this.articles.find(({ id: _id }) => _id === id);
  }

  public async getArticles() {
    return this.articles;
  }

  public async getArticleIndex(articleId: string) {
    return this.articles.findIndex((article) => article.id === articleId);
  }

  public async updateArticleById(
    id: string,
    partialArticle: Partial<IArticleData>,
  ) {
    const article = await this.getArticleById(id);

    if (!article) return;

    const index = await this.getArticleIndex(id);

    const resultingArticle = {
      ...article,
      ...partialArticle,
    };

    this.articles.splice(index, 1, resultingArticle);

    return resultingArticle;
  }

  public async publishArticle({
    title,
    description,
    tags,
    username,
  }: {
    title: string;
    description: string;
    tags: string[];
    username: string;
  }) {
    this.articles.unshift({
      title,
      description,
      tags,
      comments: [],
      date: new Date(DEFAULT_TIME).toString(),
      id: `post-${this.articles.length + 1}`,
      likers: [],
      username,
    });
  }

  public async getArticlesByTag(tag: string) {
    return (await this.getArticles()).filter(
      (article) => !!article.tags.find((_tag) => _tag === tag),
    );
  }

  public async getArticlePaginationTotal({
    tag,
    username,
  }: {
    index?: number;
    articlesPerPage?: number;
    tag?: string;
    username?: string;
  }) {
    const articles = await this.getArticlesByPagination({
      articlesPerPage: Number.MAX_SAFE_INTEGER,
      tag,
      username,
    });
    return Math.ceil(
      articles.length / EArticleDatabaseConstant.ArticlesPerPage,
    );
  }

  public async getArticlesByPagination({
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
    return (await this.getArticles())
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

  public async getArticlesByUsername(username: string) {
    return (await this.getArticles()).filter(
      (article) => article.username === username,
    );
  }

  public async getAllTags() {
    return Array.from(
      new Set((await this.getArticles()).map((article) => article.tags).flat()),
    );
  }

  public async getLikers(id: string) {
    const article = await this.getArticleById(id);

    if (!article) return [];

    return article.likers;
  }

  public async updateLikers(id: string, likers: string[]) {
    const article = await this.getArticleById(id);

    if (!article) return;

    this.updateArticleById(id, { likers });
  }

  public async likeArticleById(id: string, username: string) {
    const article = await this.getArticleById(id);

    if (!article) return;

    const likers = await this.getLikers(article.id);

    const hasLiked = likers.find((id) => id === username);

    const nextLikers = [
      ...likers.filter((id) => id !== username),
      !hasLiked && username,
    ].filter(Boolean) as string[];

    this.updateLikers(id, nextLikers);
  }

  public async addCommentById(id: string, comment: string, username: string) {
    const article = await this.getArticleById(id);

    if (!article) return;

    await this.updateArticleById(id, {
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

  public async removeArticleById(id: string) {
    const index = await this.getArticleIndex(id);
    const doesExist = index > 0;

    if (doesExist) {
      this.articles.splice(index, 1);
    }
  }
}
