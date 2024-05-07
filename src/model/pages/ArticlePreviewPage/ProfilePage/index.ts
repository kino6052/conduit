import { ArticlePreviewPage } from "..";
import { User } from "../../../components/User";
import { IArticleDAO } from "../../../data/ArticleDAO/types";
import { IUserDAO } from "../../../data/UserDAO/types";
import { IAppState } from "../../../types";
import { EPage, IPage } from "../../types";

export class ProfilePage extends ArticlePreviewPage implements IPage {
  public pageType: EPage = EPage.Profile;
  public user: User | undefined;
  public isFollowing: boolean = false;

  constructor(state: IAppState, articlesDao: IArticleDAO, userDao: IUserDAO) {
    super(state, articlesDao, userDao);
  }

  public async initialize(): Promise<void> {
    await super.initialize();

    const userInfo = await this.userDao.findUserByName(
      this.state.selectedUsername,
    );

    if (!userInfo) {
      console.warn("No user info");
      return;
    }

    this.user = new User(userInfo, this.state, this.articleDao, this.userDao);

    this.isFollowing = await this.user.getIsFollowing();

    return;
  }
}
