import { TUserInfo } from "../../../interfaces/data/UserDAO/types";
import { INavigationService } from "../../../interfaces/services/NavigationService/types";
import { IUserService } from "../../../interfaces/services/UserService/types";
import { EPage } from "../../pages/types";
import { IUser } from "./types";

export class User implements IUser {
  isFollowedByUs: boolean;

  constructor(
    public userInfo: TUserInfo,
    private userService: IUserService,
    private navigationService: INavigationService,
  ) {
    this.isFollowedByUs =
      !!userService.currentUser &&
      !!userInfo?.followers.includes(userService.currentUser);

    console.warn({ userInfo });
  }

  public async toggleFollowBy() {
    const isFollowedByUs = await this.userService.toggleFollow(
      this.userInfo.username,
    );
    this.isFollowedByUs = !!isFollowedByUs;
  }

  public async examine() {
    await this.navigationService.navigateToUserProfile(this.userInfo.username);
  }
}
