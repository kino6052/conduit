import { User } from "../../../components/User";
import { IUser } from "../../../components/User/types";
import { IUserDAO } from "../../../data/UserDAO/types";
import { EPage } from "../../../pages/types";
import { INavigationService } from "../../NavigationService/types";
import { IUserService } from "../../UserService/types";

export class SimpleUserService implements IUserService {
  constructor(
    private userDao: IUserDAO,
    private navigationService: INavigationService,
  ) {}

  currentUser: string | undefined = "";

  async getUserProfile(username: string): Promise<IUser | undefined> {
    const userInfo = await this.userDao.findUserByName(username);

    if (!userInfo) return;

    const isFollowedByUs =
      !!this.currentUser && !!userInfo?.followers.includes(this.currentUser);

    return new User(
      isFollowedByUs,
      this.toggleFollowBy.bind(this),
      userInfo,
      this.navigationService,
    );
  }

  async toggleFollowBy(username: string) {
    try {
      if (!this.currentUser) {
        await this.navigationService.navigate(EPage.SignIn);
        return;
      }

      const followers = await this.userDao.getFollowers(username);
      const isFollowing = followers.includes(username);

      if (isFollowing) {
        const nextFollowers = followers.filter(
          (follower) => follower !== username,
        );
        await this.userDao.updateFollowers(username, nextFollowers);
        return;
      }

      await this.userDao.followUserById(username, username);
    } catch (e) {
      console.error(e);
    }
  }
}
