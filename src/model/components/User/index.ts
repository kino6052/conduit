import { IArticleDAO } from "../../data/ArticleDAO/types";
import { IUserDAO, TUserInfo } from "../../data/UserDAO/types";
import { IAppState } from "../../types";
import { changePage } from "../Navigation";

export class User {
  constructor(
    public userInfo: TUserInfo,
    private appState: IAppState,
    private articleDao: IArticleDAO,
    private userDao: IUserDAO,
  ) {}

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

  public async getIsFollowing() {
    return (await this.userDao.getFollowers(this.userInfo.username)).includes(
      this.appState.currentUsername,
    );
  }

  public async toggleFollowBy(username: string) {
    const followers = await this.userDao.getFollowers(this.userInfo.username);
    const isFollowing = followers.includes(username);

    if (isFollowing) {
      const nextFollowers = followers.filter(
        (follower) => follower !== username,
      );
      await this.userDao.updateFollowers(this.userInfo.username, nextFollowers);
      return;
    }

    await this.userDao.followUserById(this.userInfo.username, username);
  }
}
