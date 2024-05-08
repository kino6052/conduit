import { getTabs } from "../../components/Navigation";
import { ITab } from "../../components/Tab/types";
import { IArticleData, IArticleDAO } from "../../data/ArticleDAO/types";
import { IUserDAO } from "../../data/UserDAO/types";
import { IAppState } from "../../types";
import { EPage, IPage } from "../types";

export class ArticlePage implements IPage {
  public pageType: EPage = EPage.Article;
  public article: IArticleData | undefined;
  public tabs: ITab[];

  constructor(
    private articleId: string,
    public state: IAppState,
    private articlesDao: IArticleDAO,
    private userDao: IUserDAO,
  ) {
    this.tabs = getTabs(this.state, this.articlesDao, this.userDao);
  }

  public async initialize(): Promise<void> {
    this.articlesDao.getArticleById(this.articleId).then((article) => {
      this.article = article;
    });
  }
}
