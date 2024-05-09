import { EAppConstant } from "../../constants";
import { IArticleDAO } from "../../data/ArticleDAO/types";
import { IUserDAO } from "../../data/UserDAO/types";
import { IAppState } from "../../types";

export class Pagination {
  private _currentPageNumber = 0;
  public numberOfPages = 1;

  public get currentPageNumber() {
    return this._currentPageNumber;
  }

  public set currentPageNumber(currentPageNumber: number) {
    this._currentPageNumber = Math.max(this.numberOfPages, currentPageNumber);
  }

  public async initialize(tag?: string, username?: string) {
    this.numberOfPages = await this.articleDao.getArticlePaginationTotal({
      articlesPerPage: EAppConstant.ArticlesPerPage,
      tag,
      username,
    });
  }

  constructor(
    private appState: IAppState,
    private articleDao: IArticleDAO,
    private userDao: IUserDAO,
  ) {}
}
