import { filter, tap } from "rxjs";
import { EPage, TAppProps } from "../../types";
import {
  RefreshSubject,
  IncomingEventSubject,
  ResultingStateSubject,
} from "../common.logic";
import { ESignUpConstant } from "./constants";
import { getEventTargetValue } from "../../utils/events";
import { updatePage } from "../utils/utils";
import { UserDatabase } from "../data/user";
import { AppState } from "../data/app";
import { provideNavbarProps } from "../navbar/utils";

let usernameInput = "";
let passwordInput = "";

RefreshSubject.pipe(
  filter(() => AppState.currentPage === EPage.SignUp),
  tap(() => {
    const nextState: TAppProps<EPage.SignUp> = {
      navbarProps: provideNavbarProps(),
      page: EPage.SignUp,
      pageProps: {
        buttonProps: {
          id: ESignUpConstant.SubmitButtonId,
          text: "Submit",
        },
        passwordInputProps: {
          id: ESignUpConstant.PasswordInputId,
          placeholder: "Password",
          value: passwordInput,
        },
        usernameInputProps: {
          id: ESignUpConstant.UserNameInputId,
          placeholder: "Username",
          value: usernameInput,
        },
      },
    };

    ResultingStateSubject.next(nextState);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.id === ESignUpConstant.UserNameInputId),
  tap((event) => {
    const id = event.id;

    if (!id) return;

    const value = getEventTargetValue(event);

    usernameInput = value ?? "";

    updatePage(EPage.SignUp);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.id === ESignUpConstant.PasswordInputId),
  tap((event) => {
    const id = event.id;

    if (!id) return;

    const value = getEventTargetValue(event);

    passwordInput = value ?? "";

    updatePage(EPage.SignUp);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.id === ESignUpConstant.SubmitButtonId),
  tap((event) => {
    const id = event.id;

    if (!id) return;

    const userInfo = UserDatabase.findUserByName(usernameInput);

    if (userInfo) {
      console.error("Duplicate users");
      return;
    }

    if (!passwordInput || passwordInput.length < 5) {
      console.error("Unacceptable password");
      return;
    }

    const newUserInfo = {
      articleIds: [],
      date: "", // FIXME
      favoriteArticleIds: [],
      password: passwordInput,
      username: usernameInput,
      imageSrc: "",
      followers: [],
    };

    UserDatabase.registerNewUser(newUserInfo);

    AppState.currentUserId = newUserInfo.username;

    updatePage(EPage.Home);
  }),
).subscribe();
