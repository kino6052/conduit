import { Article } from "../../components/Article";
import { IArticle } from "../../components/Article/types";
import { getNavigationTabs } from "../../components/Navigation";
import { Pagination } from "../../components/Pagination";
import { ContentTab } from "../../components/Tab";
import { ITab } from "../../components/Tab/types";
import { IArticleDAO, IArticleData } from "../../data/ArticleDAO/types";
import { IUserDAO } from "../../data/UserDAO/types";
import { IAppState } from "../../types";

/**
 * This class is needed because there are multiple pages that can preview articles
 */
export class ArticlePreviewPage {
  public tags: string[] = [];
  public navigationTabs: ITab[] = [];
  public pagination = new Pagination();
  public articles: IArticle[] = [];
  public tabs: ITab[] = [];

  constructor(
    public state: IAppState,
    protected articleDao: IArticleDAO,
    protected userDao: IUserDAO,
  ) {
    if (!state) throw new Error("No state provided");
    if (!articleDao) throw new Error("No article source provided");
    if (!userDao) throw new Error("No user source provided");

    this.navigationTabs = getNavigationTabs(
      this.state,
      this.articleDao,
      this.userDao,
    );

    this.tabs = [
      new ContentTab("Global Feed", "global", async () => {
        const articles = (await this.articleDao.getArticles()) ?? [];

        this.articles = this.processArticles(articles);
      }),

      this.state.currentUsername &&
        new ContentTab("Your Feed", "your", async () => {
          const articles =
            (await this.articleDao.getArticlesByUsername(
              this.state.currentUsername,
            )) ?? [];

          this.articles = this.processArticles(articles);
        }),
    ].filter(Boolean) as ITab[];
  }

  private processArticles(articleData: IArticleData[]) {
    return articleData.map(
      (articleData) =>
        new Article(articleData, this.state, this.articleDao, this.userDao),
    );
  }

  public async initialize() {
    this.state.isLoading = true;

    return Promise.all([
      this.articleDao.getArticles(),
      this.articleDao.getAllTags(),
    ]).then(([articles, tags]) => {
      this.articles = articles.map(
        (articleData) =>
          new Article(articleData, this.state, this.articleDao, this.userDao),
      );
      this.tags = tags;
      this.state.isLoading = false;
    });
  }
}
