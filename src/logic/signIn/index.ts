import { filter, tap } from "rxjs";
import { EPage, TAppProps } from "../../types";
import { getEventTargetValue } from "../../utils/events";
import {
  CurrentPageSubject,
  IncomingEventSubject,
  ResultingStateSubject,
  UserDatabase,
  UserInfoSubject,
  provideNavbarProps,
} from "../common.logic";
import { ESignInConstant } from "./constants";

let usernameInput = "";
let passwordInput = "";

CurrentPageSubject.pipe(
  filter((page) => page === EPage.SignIn),
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
        },
        usernameInputProps: {
          id: ESignInConstant.UserNameInputId,
          placeholder: "Username",
          value: usernameInput,
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

    CurrentPageSubject.next(EPage.SignIn);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.id === ESignInConstant.PasswordInputId),
  tap((event) => {
    const id = event.id;

    if (!id) return;

    const value = getEventTargetValue(event);

    passwordInput = value ?? "";

    CurrentPageSubject.next(EPage.SignIn);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.id === ESignInConstant.SubmitButtonId),
  tap((event) => {
    const id = event.id;

    if (!id) return;

    const userInfo = UserDatabase.findUserByName(usernameInput);

    if (!userInfo) {
      console.error("Not found");
      return;
    }

    if (passwordInput !== userInfo.password) {
      console.error("Passwords don't match");
      return;
    }

    UserInfoSubject.next(userInfo);

    CurrentPageSubject.next(EPage.Home);
  }),
).subscribe();
