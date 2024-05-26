import { TUserInfo } from "../../data/UserDAO/types";
import { INavigationService } from "../../services/NavigationService/types";
import { IUserService } from "../../services/UserService/types";
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
  }

  public async toggleFollowBy() {
    if (!this.userService.currentUser) return;
    const isFollowedByUs = this.userService.toggleFollow(
      this.userService.currentUser,
    );
    this.isFollowedByUs = !!isFollowedByUs;
  }

  public async examine() {
    await this.navigationService.navigateToUserProfile(this.userInfo.username);
  }
}
