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

  public async initialize(tag?: string, index = 0): Promise<void> {
    try {
      this.state.isLoading = true;

      const userInfo = await this.userDao.findUserByName(
        this.state.selectedUsername,
      );

      if (!userInfo) {
        console.warn("No user info");
        return;
      }

      await super.initialize(tag, index, userInfo.username);

      this.user = new User(userInfo, this.state, this.articleDao, this.userDao);

      await this.user.initialize();

      this.isFollowing = this.user.isFollowing;
    } catch (e) {
      console.error(e);
    } finally {
      this.state.isLoading = false;
    }
  }
}
