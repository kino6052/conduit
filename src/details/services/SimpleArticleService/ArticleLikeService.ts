import { EPage } from "../../../app/entities/pages/types";
import { IArticleDAO } from "../../../app/interfaces/data/ArticleDAO/types";
import { IArticleLikeService } from "../../../app/interfaces/services/ArticleService/types";
import { INavigationService } from "../../../app/interfaces/services/NavigationService/types";
import { IUserService } from "../../../app/interfaces/services/UserService/types";

export class ArticleLikeService implements IArticleLikeService {
  constructor(
    private articleDao: IArticleDAO,
    private navigationService: INavigationService,
    private userService: IUserService,
  ) {}

  public async likeArticleById(id: string): Promise<number> {
    const username = this.userService.currentUser;

    if (!username) {
      await this.navigationService.navigate(EPage.SignIn);
      return 0;
    }

    await this.articleDao.likeArticleById(id, username);
    const article = await this.articleDao.getArticleById(id);
    return article?.likers.length ?? 0;
  }
}
