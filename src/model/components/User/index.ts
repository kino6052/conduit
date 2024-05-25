import { TUserInfo } from "../../data/UserDAO/types";
import { INavigationService } from "../../services/NavigationService/types";
import { IUser } from "./types";

export class User implements IUser {
  constructor(
    public isFollowedByUs: boolean,
    public toggleFollowBy: (username: string) => Promise<void>,
    public userInfo: TUserInfo,
    private navigationService: INavigationService,
  ) {}

  public async examine() {
    await this.navigationService.navigateToUserProfile(this.userInfo.username);
  }
}
