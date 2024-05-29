import { User } from "../../../components/User";
import { IUser } from "../../../components/User/types";
import { IUserDAO } from "../../../data/UserDAO/types";
import { EPage } from "../../../pages/types";
import { INavigationService } from "../../NavigationService/types";
import { IUserContext } from "../../UserContext/types";
import { IUserService } from "../types";

export class SimpleUserService implements IUserService {
  constructor(
    private userDao: IUserDAO,
    private navigationService: INavigationService,
    private userContext: IUserContext,
  ) {}

  async getUserProfile(username: string): Promise<IUser | undefined> {
    const userInfo = await this.userDao.findUserByName(username);

    if (!userInfo) return;

    const user = new User(userInfo, this, this.navigationService);

    return user;
  }

  async toggleFollow(username: string) {
    try {
      if (!this.userContext.currentUsername) {
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
        return false;
      }

      await this.userDao.followUserById(username, username);
      return true;
    } catch (e) {
      console.error(e);
    }
  }

  async signIn(username: string, password: string) {
    const response = await this.userDao.login(username, password);
    if (response.errors) return response;
    this.userContext.currentUsername = username;
    await this.navigationService.navigate(EPage.Home);
    return response;
  }

  public async signUp(username: string, password: string) {
    const response = await this.userDao.registerNewUser(username, password);
    if (response.errors) return response;
    this.userContext.currentUsername = username;
    await this.navigationService.navigate(EPage.Home);
    return response;
  }

  public get currentUser() {
    return this.userContext.currentUsername;
  }

  public async getCurrentUser() {
    if (!this.userContext.currentUsername) return;
    const userInfo = await this.userDao.findUserByName(
      this.userContext.currentUsername,
    );
    if (!userInfo) return;
    return new User(userInfo, this, this.navigationService);
  }

  public async updateUser(
    username: string,
    password: string,
    imageSrc: string,
    bio: string,
  ) {
    if (!this.userContext.currentUsername) return;
    await this.userDao.updateUserByName(this.userContext.currentUsername, {
      username,
      password,
      imageSrc,
      bio,
    });

    await this.navigationService.navigate(EPage.Home);
  }

  public async logout() {
    this.userContext.currentUsername = "";

    await this.navigationService.navigate(EPage.Home);
  }
}
