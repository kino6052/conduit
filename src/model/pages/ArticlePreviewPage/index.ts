import { Article } from "../../components/Article";
import { IArticle } from "../../components/Article/types";
import { Pagination } from "../../components/Pagination";
import { ITab } from "../../components/Tab/types";
import { IArticleDAO } from "../../data/ArticleDAO/types";
import { IUserDAO } from "../../data/UserDAO/types";
import { IAppState } from "../../types";

/**
 * This class is needed because there are multiple pages that can preview articles
 */
export class ArticlePreviewPage {
  public tags: string[] = [];
  public tabs: ITab[] = [];
  public pagination = new Pagination();
  public articles: IArticle[] = [];

  constructor(
    public state: IAppState,
    protected articleDao: IArticleDAO,
    protected userDao: IUserDAO,
  ) {
    if (!state) throw new Error("No state provided");
    if (!articleDao) throw new Error("No article source provided");
    if (!userDao) throw new Error("No user source provided");
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
