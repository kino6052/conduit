import { IArticleData, IArticleDAO } from "../../data/ArticleDAO/types";
import { IAppState } from "../../types";
import { EPage, IPage } from "../types";

export class ArticlePage implements IPage {
  public pageType: EPage = EPage.Article;
  public article: IArticleData | undefined;

  constructor(
    private articleId: string,
    public state: IAppState,
    private articlesSource: IArticleDAO,
  ) {}

  public async initialize(): Promise<void> {
    this.articlesSource.getArticleById(this.articleId).then((article) => {
      this.article = article;
    });
  }
}
