import { EPage } from "../../../app/entities/pages/types";
import { IArticleDAO } from "../../../app/interfaces/data/ArticleDAO/types";
import { IArticleCommentService } from "../../../app/interfaces/services/ArticleService/types";
import { INavigationService } from "../../../app/interfaces/services/NavigationService/types";
import { IUserService } from "../../../app/interfaces/services/UserService/types";

export class ArticleCommentService implements IArticleCommentService {
  constructor(
    private articleDao: IArticleDAO,
    private navigationService: INavigationService,
    private userService: IUserService,
  ) {}

  public async submitComment(value: string, articleId: string): Promise<void> {
    if (!this.userService.currentUser) {
      await this.navigationService.navigate(EPage.SignIn);
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
}
