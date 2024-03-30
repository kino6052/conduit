import { EPage } from "../../types";
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
}
