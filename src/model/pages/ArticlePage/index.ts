import { IArticleData, IArticleSource } from "../../data/ArticleSource/types";
import { IAppState } from "../../types";
import { EPage, IPage } from "../types";

export class ArticlePage implements IPage {
  public pageType: EPage = EPage.Article;
  public article: IArticleData | undefined;

  constructor(
    articleId: string,
    public state: IAppState,
    private articlesSource: IArticleSource,
  ) {
    this.articlesSource.getArticleById(articleId).then((article) => {
      this.article = article;
    });
  }
}
