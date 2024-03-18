import { filter, tap } from "rxjs";
import { EPage, TAppProps } from "../../types";
import {
  CurrentPageSubject,
  IncomingEventSubject,
  ResultingStateSubject,
  UserInfoSubject,
} from "../common.logic";
import { ESignUpConstant } from "./constants";
import { getEventTargetValue } from "../../utils/events";
import { provideNavbarProps } from "../utils/utils";
import { UserDatabase } from "../data/user";

let usernameInput = "";
let passwordInput = "";

CurrentPageSubject.pipe(
  filter((page) => page === EPage.SignUp),
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

    CurrentPageSubject.next(EPage.SignUp);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.id === ESignUpConstant.PasswordInputId),
  tap((event) => {
    const id = event.id;

    if (!id) return;

    const value = getEventTargetValue(event);

    passwordInput = value ?? "";

    CurrentPageSubject.next(EPage.SignUp);
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
    };

    UserDatabase.registerNewUser(newUserInfo);

    UserInfoSubject.next(newUserInfo);

    CurrentPageSubject.next(EPage.Home);
  }),
).subscribe();
