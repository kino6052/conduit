import { SignUpPage } from "../../../../../../model/pages/SignUpPage";
import { EPage } from "../../../../../../model/pages/types";
import { IAppState } from "../../../../../../model/types";
import { TAppProps } from "../../../types";
import { generateNavBarProps } from "../../selectors";

export const generateSignUpPageProps = (
  state: IAppState,
  refresh?: () => void,
): TAppProps<EPage.SignUp> => {
  const page = state.currentPage as SignUpPage;
  return {
    navbarProps: generateNavBarProps(state, refresh),
    page: EPage.SignUp,
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
      documentationLinkProps: {
        onClick: async (e) => {
          window.open(
            "https://www.google.com/search?q=do+a+barrel+roll",
            "_blank",
          );
        },
      },
      buttonProps: {
        onClick: async () => {
          page.signUp().then(() => {
            refresh?.();
          });
          refresh?.();
        },
        text: "Sign Up",
        disabled: !page.username || !page.password,
      },
    },
  };
};
