import { ArticlePreviewPage } from "..";
import { IUser } from "../../../components/User/types";
import { IArticleService } from "../../../services/ArticleService/types";
import { INavigationService } from "../../../services/NavigationService/types";
import { IUserService } from "../../../services/UserService/types";
import { EPage, IPage } from "../../types";

export class ProfilePage extends ArticlePreviewPage implements IPage {
  public pageType: EPage = EPage.Profile;
  public user: IUser | undefined;
  public isFollowing: boolean = false;

  private constructor(
    articleService: IArticleService,
    navigationService: INavigationService,
    private userService: IUserService,
  ) {
    super(articleService, navigationService);
  }

  public static async create(
    username: string,
    articleService: IArticleService,
    navigationService: INavigationService,
    userService: IUserService,
  ) {
    const page = new ProfilePage(
      articleService,
      navigationService,
      userService,
    );

    await page.initialize({ username });

    page.user = await page.userService.getUserProfile(username);

    return page;
  }
}
