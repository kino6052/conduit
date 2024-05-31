import {
  IArticleCRUD,
  IArticleData,
} from "../../../app/interfaces/data/ArticleDAO/types";
import { DEFAULT_POSTS } from "./data";

export class ArticleCRUD implements IArticleCRUD {
  private articles: IArticleData[] = DEFAULT_POSTS;

  constructor(
    private generateDate: () => string,
    private generateId: () => string,
  ) {}

  public async getArticleIds() {
    return this.articles.map((article) => article.id);
  }

  public async getDoesArticleExist(id: string) {
    const ids = await this.getArticleIds();
    return ids.includes(id);
  }

  public async getArticleById(id: string) {
    if (!(await this.getDoesArticleExist(id))) {
      throw new Error("Article does not exist");
    }
    return this.articles.find(({ id: _id }) => _id === id);
  }

  public async getArticles() {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async operation
    return this.articles;
  }

  public async updateArticleById(
    id: string,
    partialArticle: Partial<IArticleData>,
  ) {
    const article = await this.getArticleById(id);
    if (!article) return;
    const index = this.articles.findIndex((article) => article.id === id);
    const resultingArticle = { ...article, ...partialArticle };
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
    const article = {
      title,
      description,
      tags,
      comments: [],
      date: this.generateDate(),
      id: this.generateId(),
      likers: [],
      username,
    };
    this.articles.unshift(article);
    return article;
  }

  public async removeArticleById(id: string) {
    this.articles = this.articles.filter(({ id: _id }) => _id !== id);
  }
}
