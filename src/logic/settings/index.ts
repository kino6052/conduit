import { ArgumentOutOfRangeError, filter, tap } from "rxjs";
import { ESettingsPageConstant } from "../../pages/SettingsPage/constants";
import { EPage, TAppProps } from "../../types";
import {
  IncomingEventSubject,
  RefreshSubject,
  ResultingStateSubject,
} from "../common.logic";
import { getEventTargetValue } from "../../utils/events";
import { UserDatabase } from "../data/user";
import { provideNavbarProps } from "../navbar/utils";
import { AppState } from "../data/app";
import { updatePage } from "../utils/utils";

let usernameInput = "";
let passwordInput = "";
let imageUrlInput = "";
let bioInput = "";

RefreshSubject.pipe(
  filter(() => AppState.currentPage === EPage.Settings),
  tap(() => {
    const nextState: TAppProps<EPage.Settings> = {
      page: EPage.Settings,
      pageProps: {
        buttonProps: {
          id: ESettingsPageConstant.SubmitButtonId,
          text: "Submit",
        },
        usernameInputProps: {
          id: ESettingsPageConstant.UserNameInputId,
          placeholder: "Username",
          value: usernameInput,
        },
        bioInputProps: {
          id: ESettingsPageConstant.BioInputId,
          placeholder: "Short bio",
          value: bioInput,
        },
        imageUrlInputProps: {
          id: ESettingsPageConstant.ImageURLInputId,
          placeholder: "Image URL",
          value: imageUrlInput,
        },
        passwordInputProps: {
          id: ESettingsPageConstant.PasswordInputId,
          placeholder: "Password",
          value: passwordInput,
        },
        logoutButtonProps: {
          id: ESettingsPageConstant.LogoutButtonId,
          text: "Log out",
        },
      },
      navbarProps: provideNavbarProps(),
    };
    ResultingStateSubject.next(nextState);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.id === ESettingsPageConstant.LogoutButtonId),
  tap((event) => {
    const id = event.id;

    if (!id) return;

    AppState.currentUserId = undefined;

    updatePage(EPage.Home);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.id === ESettingsPageConstant.SubmitButtonId),
  tap((event) => {
    const id = event.id;

    if (!id) return;

    const username = AppState.currentUserId;

    if (usernameInput && username) {
      const userInfo = UserDatabase.updateUserByName(username, {
        username: usernameInput,
      });

      AppState.currentUserId = userInfo?.username;
    }

    updatePage(EPage.Home);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.id === ESettingsPageConstant.UserNameInputId),
  tap((event) => {
    const id = event.id;

    if (!id) return;

    usernameInput = getEventTargetValue(event) ?? "";

    updatePage(EPage.Settings);
  }),
).subscribe();
