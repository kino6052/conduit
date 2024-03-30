import { filter, tap } from "rxjs";
import { EPage, TAppProps } from "../../types";
import { getEventTargetValue } from "../../utils/events";
import {
  RefreshSubject,
  IncomingEventSubject,
  ResultingStateSubject,
} from "../common.logic";
import { ESignInConstant } from "./constants";
import { UserDatabase } from "../data/user";
import { provideNavbarProps, updatePage } from "../utils/utils";
import { AppState } from "../data/app";

let usernameInput = "";
let usernameError = "";

let passwordInput = "";
let passwordError = "";

RefreshSubject.pipe(
  filter(() => AppState.currentPage === EPage.SignIn),
  tap(() => {
    const nextState: TAppProps<EPage.SignIn> = {
      navbarProps: provideNavbarProps(),
      page: EPage.SignIn,
      pageProps: {
        buttonProps: {
          id: ESignInConstant.SubmitButtonId,
          text: "Submit",
        },
        passwordInputProps: {
          id: ESignInConstant.PasswordInputId,
          placeholder: "Password",
          value: passwordInput,
          error: passwordError,
        },
        usernameInputProps: {
          id: ESignInConstant.UserNameInputId,
          placeholder: "Username",
          value: usernameInput,
          error: usernameError,
        },
        linkProps: {
          id: ESignInConstant.DocumentationLinkId,
        },
      },
    };

    ResultingStateSubject.next(nextState);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.id === ESignInConstant.UserNameInputId),
  tap((event) => {
    const id = event.id;

    if (!id) return;

    const value = getEventTargetValue(event);

    usernameInput = value ?? "";

    updatePage(EPage.SignIn);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.id === ESignInConstant.PasswordInputId),
  tap((event) => {
    const id = event.id;

    if (!id) return;

    const value = getEventTargetValue(event);

    passwordInput = value ?? "";

    updatePage(EPage.SignIn);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.id === ESignInConstant.SubmitButtonId),
  tap((event) => {
    const id = event.id;

    if (!id) return;

    const userInfo = UserDatabase.findUserByName(usernameInput);

    if (!userInfo) {
      usernameError = "Not found";
      console.error(usernameError);
    }

    if (userInfo && passwordInput !== userInfo.password) {
      passwordError = "Passwords don't match";
      console.error(passwordError);
    }

    if (userInfo) {
      AppState.currentUserId = userInfo.username;
      updatePage(EPage.Home);
      return;
    }

    updatePage(EPage.SignIn);
  }),
).subscribe();
