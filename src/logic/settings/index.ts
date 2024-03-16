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

let usernameInput = "";

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
        inputProps: {
          id: ESettingsPageConstant.UserNameInputId,
          placeholder: "Username",
          value: usernameInput,
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
