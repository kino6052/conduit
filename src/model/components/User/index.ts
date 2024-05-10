import { IArticleDAO } from "../../data/ArticleDAO/types";
import { IUserDAO, TUserInfo } from "../../data/UserDAO/types";
import { SignInPage } from "../../pages/SignInPage";
import { IAppState } from "../../types";
import { changePage } from "../Navigation";

export class User {
  public isFollowing = false;

  constructor(
    public userInfo: TUserInfo,
    private appState: IAppState,
    private articleDao: IArticleDAO,
    private userDao: IUserDAO,
  ) {}

  public async initialize() {
    this.isFollowing = await this.getIsFollowing();
  }

  public async examine() {
    this.appState.selectedUsername = this.userInfo.username;
    const { ProfilePage } = await import(
      "../../pages/ArticlePreviewPage/ProfilePage"
    );

    return changePage(
      new ProfilePage(this.appState, this.articleDao, this.userDao),
      this.appState,
    );
  }

  private async getIsFollowing() {
    return (await this.userDao.getFollowers(this.userInfo.username)).includes(
      this.appState.currentUsername,
    );
  }

  public async toggleFollowBy(username: string) {
    try {
      this.appState.isLoading = true;

      if (!this.appState.currentUsername) {
        await changePage(
          new SignInPage(this.appState, this.articleDao, this.userDao),
          this.appState,
        );
        return;
      }

      const followers = await this.userDao.getFollowers(this.userInfo.username);
      const isFollowing = followers.includes(username);

      if (isFollowing) {
        const nextFollowers = followers.filter(
          (follower) => follower !== username,
        );
        await this.userDao.updateFollowers(
          this.userInfo.username,
          nextFollowers,
        );
        return;
      }

      await this.userDao.followUserById(this.userInfo.username, username);
    } catch (e) {
      console.error(e);
    } finally {
      await this.initialize();
      this.appState.isLoading = false;
    }
  }
}
