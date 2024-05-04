import { EPage } from "../../io/ui/view/types";
import { IEvent } from "../../utils/events";
import { AppState } from "../data/app";
import { UserDatabase } from "../data/user";
import { updatePage } from "../utils/utils";

export class UserInfoLogic {
  static handleUserInfoClick(event: IEvent) {
    const username = event.id;
    if (!username) return;
    const userInfo = UserDatabase.findUserByName(username);

    AppState.selectedUserId = userInfo?.username;

    updatePage(EPage.Profile);
  }

  public static handleFollowClick(event: IEvent) {
    const currentUserId = AppState.currentUserId;

    if (!currentUserId) {
      AppState.currentPage = EPage.SignIn;
      updatePage();
      return;
    }

    const selectedUserId = event.id;

    if (!selectedUserId) {
      AppState.currentPage = EPage.Home;
      updatePage();
      return;
    }

    UserDatabase.followUserById(selectedUserId, currentUserId);
    updatePage();
  }
}
