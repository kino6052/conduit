import { Article } from "../../../components/Article";
import { EAppConstant } from "../../../constants";
import { IArticleDAO } from "../../../data/ArticleDAO/types";
import { ETab } from "../../../pages/ArticlePreviewPage/constants";
import { EPage } from "../../../pages/types";
import { INavigationService } from "../../NavigationService/types";
import { IUserService } from "../../UserService/types";
import { IArticleService } from "../types";

export class SimpleArticleService implements IArticleService {
  constructor(
    private articleDao: IArticleDAO,
    private navigationService: INavigationService,
    private userService: IUserService,
  ) {}

  async getDataForPagination(
    pageIndex?: number,
    tag?: string,
    username?: string,
  ) {
    return Promise.all([
      this.articleDao.getAllTags(),
      this.articleDao.getArticlePaginationTotal({
        articlesPerPage: EAppConstant.ArticlesPerPage,
        tag,
        username,
      }),
      this.articleDao.getArticlesByPagination({
        tag,
        index: pageIndex,
        username,
      }),
    ]).then(([tags, numberOfPages, articles]) => ({
      tags,
      numberOfPages,
      articles: articles.map((a) => new Article(a, this)),
    }));
  }

  public async examineAuthor(username: string) {
    await this.navigationService.navigateToUserProfile(username);
  }

  public async likeArticleById(id: string) {
    const username = this.userService.currentUser;

    if (!username) {
      await this.navigationService.navigate(EPage.SignIn);
      return 0;
    }

    await this.articleDao.likeArticleById(id, username);
    const article = await this.articleDao.getArticleById(id);
    return article?.likers.length ?? 0;
  }

  public async readArticle(articleId: string) {
    await this.navigationService.navigateToArticle(articleId);
  }

  public async selectTab(tabId: ETab) {
    if (tabId === ETab.YourFeed) {
      await this.getDataForPagination(
        0,
        undefined,
        this.userService.currentUser,
      );
      return;
    }
    this.getDataForPagination();
  }

  public async selectTag(tag: string) {
    await this.getDataForPagination(0, tag);
  }
}
