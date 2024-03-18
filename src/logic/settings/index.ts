import { filter, tap } from "rxjs";
import { ESettingsPageConstant } from "../../pages/SettingsPage/constants";
import { EPage, TAppProps } from "../../types";
import {
  CurrentPageSubject,
  IncomingEventSubject,
  ResultingStateSubject,
  UserDatabase,
  UserInfoSubject,
  provideNavbarProps,
} from "../common.logic";
import { ESignInConstant } from "../signIn/constants";
import { getEventTargetValue } from "../../utils/events";

let usernameInput = "";
let passwordInput = "";
let imageUrlInput = "";
let bioInput = "";

CurrentPageSubject.pipe(
  filter((page) => page === EPage.Settings),
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

    UserInfoSubject.next(undefined);

    CurrentPageSubject.next(EPage.Home);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.id === ESettingsPageConstant.SubmitButtonId),
  tap((event) => {
    const id = event.id;

    if (!id) return;

    const username = UserInfoSubject.getValue()?.username;

    if (usernameInput && username) {
      const userInfo = UserDatabase.updateUserByName(username, {
        username: usernameInput,
      });

      UserInfoSubject.next(userInfo);
    }

    CurrentPageSubject.next(EPage.Home);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.id === ESettingsPageConstant.UserNameInputId),
  tap((event) => {
    const id = event.id;

    if (!id) return;

    usernameInput = getEventTargetValue(event) ?? "";

    CurrentPageSubject.next(EPage.Settings);
  }),
).subscribe();
