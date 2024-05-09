import { uniqueId } from "lodash";
import { EArticleDatabaseConstant } from "./constants";
import { IArticleData, IArticleDAO } from "./types";
import { wait } from "../../../utils/time";

const DEFAULT_POSTS: IArticleData[] = [
  {
    id: "test-post-1",
    username: "jane-lobster",
    description: "A good article, a really really good one",
    likers: [],
    tags: ["1"],
    title: "A good thing",
    date: "",
    comments: [],
  },
  {
    id: "test-post-2",
    username: "jane-lobster",
    description: "A bad article, a really really bad one",
    likers: [],
    tags: ["2"],
    title: "A bad thing",
    date: "",
    comments: [],
  },
];

export class ArticleDAOTestDouble implements IArticleDAO {
  constructor(
    private generateDate: () => string = () => new Date().toISOString(),
    private generateId: () => string = () => uniqueId(),
  ) {}

  private articles: IArticleData[] = DEFAULT_POSTS;

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
    await wait(500);
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
      date: this.generateDate(),
      id: this.generateId(),
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
    articlesPerPage = EArticleDatabaseConstant.ArticlesPerPage,
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

    console.warn({ articles: articles.length, articlesPerPage });

    return Math.ceil(articles.length / articlesPerPage);
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
    console.warn({ tag, username });

    return (await this.getArticles())
      .filter((article) => {
        if (!tag) return article;

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

    await this.updateLikers(id, nextLikers);
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
