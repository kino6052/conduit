import { EPage } from "../../../app/entities/pages/types";
import { IArticleDAO } from "../../../app/interfaces/data/ArticleDAO/types";
import { IArticleManagementService } from "../../../app/interfaces/services/ArticleService/types";
import { INavigationService } from "../../../app/interfaces/services/NavigationService/types";
import { IUserService } from "../../../app/interfaces/services/UserService/types";

export class ArticleManagementService implements IArticleManagementService {
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
  ): Promise<void> {
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

  public async delete(id: string): Promise<void> {
    try {
      const isAllowed = await this.isAllowedToCUD(id);
      if (!isAllowed) {
        throw new Error("Not allowed");
      }
      await this.articleDao.removeArticleById(id);
    } catch (e) {
      console.error(e);
    } finally {
      await this.navigationService.navigate(EPage.Home);
    }
  }

  private async isAllowedToCUD(articleId: string): Promise<boolean> {
    const articleData = await this.articleDao.getArticleById(articleId);
    const isSameUser =
      this.userService.currentUser &&
      articleData?.username === this.userService.currentUser;
    return !!isSameUser;
  }
}
