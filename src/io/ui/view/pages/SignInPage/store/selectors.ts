import { SignInPage } from "../../../../../../model/pages/SignInPage";
import { EPage } from "../../../../../../model/pages/types";
import { IAppState } from "../../../../../../model/types";
import { TAppProps } from "../../../types";
import { generateNavBarProps } from "../../selectors";

export const generateSignInPageProps = (
  state: IAppState,
  refresh?: () => void,
): TAppProps<EPage.SignIn> => {
  const page = state.currentPage as SignInPage;
  return {
    navbarProps: generateNavBarProps(state, refresh),
    page: EPage.SignIn,
    pageProps: {
      onMount: async () => {
        const result = page.initialize().then(() => {
          refresh?.();
        });

        refresh?.();

        return result;
      },
      usernameInputProps: {
        onChange: async (e) => {
          page.username.value = e.target.value;
          refresh?.();
        },
        placeholder: "Username",
        value: page.username.value,
      },
      passwordInputProps: {
        onChange: async (e) => {
          page.password.value = e.target.value;
          refresh?.();
        },
        placeholder: "Password",
        value: page.password.value,
      },
      linkProps: {
        onClick: async (e) => {
          window.open(
            "https://www.google.com/search?q=do+a+barrel+roll",
            "_blank",
          );
        },
      },
      buttonProps: {
        onClick: async () => {
          page.signIn().then(() => {
            refresh?.();
          });
          refresh?.();
        },
        text: "Sign In",
        disabled: !page.username || !page.password,
      },
    },
  };
};
