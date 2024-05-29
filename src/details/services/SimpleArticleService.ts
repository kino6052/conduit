import { EAppConstant } from "../constants";
import { IArticleDAO } from "../../app/interfaces/data/ArticleDAO/types";
import { INavigationService } from "../../app/interfaces/services/NavigationService/types";
import { IUserService } from "../../app/interfaces/services/UserService/types";
import { IArticleService } from "../../app/interfaces/services/ArticleService/types";
import { EPage } from "../../app/entities/pages/types";
import { Article } from "../../app/entities/components/Article";
import { ETab } from "../../app/entities/pages/ArticlePreviewPage/constants";
import { IArticle } from "../../app/entities/components/Article/types";

export class SimpleArticleService implements IArticleService {
  constructor(
    private articleDao: IArticleDAO,
    private navigationService: INavigationService,
    private userService: IUserService,
  ) {}

  public async publish(
    articleId: string,
    title: string,
    description: string,
    tags: string[],
  ) {
    try {
      const articleData = await this.articleDao.getArticleById(articleId);

      if (articleData) {
        await this.articleDao.updateArticleById(articleData.id, {
          title,
          description,
          tags,
        });
        return;
      }

      if (!this.userService.currentUser) return;

      await this.articleDao.publishArticle({
        description,
        tags,
        title,
        username: this.userService.currentUser,
      });
    } catch (e) {
      console.error(e);
    } finally {
      await this.navigationService.navigate(EPage.Home);
    }
  }

  public async submitComment(value: string, articleId: string) {
    if (!this.userService.currentUser) {
      this.navigationService.navigate(EPage.SignIn);
      return;
    }

    if (!value) {
      return;
    }

    await this.articleDao.addCommentById(
      articleId,
      value,
      this.userService.currentUser,
    );
  }

  public async delete(id: string) {
    try {
      await this.articleDao.removeArticleById(id);
    } catch (e) {
      console.error(e);
    } finally {
      await this.navigationService.navigate(EPage.Home);
    }
  }

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

  public async prepareArticle(
    articleId: string,
  ): Promise<IArticle | undefined> {
    const articleData = await this.articleDao.getArticleById(articleId);
    if (!articleData) {
      this.navigationService.navigate(EPage.Home);
      return;
    }
    const article = new Article(articleData, this);
    return article;
  }
}
