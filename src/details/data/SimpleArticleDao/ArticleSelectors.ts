import {
  IArticleCRUD,
  IArticleSelectors,
} from "../../../app/interfaces/data/ArticleDAO/types";

export class ArticleSelectors implements IArticleSelectors {
  constructor(private articleCRUD: IArticleCRUD) {}

  public async getArticlesByTag(tag: string) {
    return (await this.articleCRUD.getArticles()).filter((article) =>
      article.tags.includes(tag),
    );
  }

  public async getArticlePaginationTotal({
    tag,
    username,
    articlesPerPage = 10,
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
    return Math.ceil(articles.length / articlesPerPage);
  }

  public async getArticlesByPagination({
    index = 0,
    articlesPerPage = 10,
    tag,
    username,
  }: {
    index?: number;
    articlesPerPage?: number;
    tag?: string;
    username?: string;
  }) {
    return (await this.articleCRUD.getArticles())
      .filter((article) => !tag || article.tags.includes(tag))
      .filter((article) => !username || article.username === username)
      .slice(index * articlesPerPage, (index + 1) * articlesPerPage);
  }

  public async getArticlesByUsername(username: string) {
    return (await this.articleCRUD.getArticles()).filter(
      (article) => article.username === username,
    );
  }

  public async getAllTags() {
    const articles = await this.articleCRUD.getArticles();
    return Array.from(new Set(articles.flatMap((article) => article.tags)));
  }
}
