import { SignUpPage } from "../../../../../../model/pages/SignUpPage";
import { EPage } from "../../../../../../model/pages/types";
import { IAppState } from "../../../../../../model/types";
import { TAppProps } from "../../../types";
import { getAsyncRefresh } from "../../../utils/utils";
import { generateNavBarProps } from "../../selectors";

export const generateSignUpPageProps = (
  state: IAppState,
  refresh?: () => void,
): TAppProps<EPage.SignUp> => {
  const page = state.currentPage as SignUpPage;
  return {
    navbarProps: generateNavBarProps(page, refresh),
    page: EPage.SignUp,
    pageProps: {
      onMount: getAsyncRefresh(page.initialize.bind(page), refresh),
      usernameInputProps: {
        onChange: async (e) => {
          page.username.value = e.target.value;
          refresh?.();
        },
        placeholder: "Username",
        value: page.username.value,
        disabled: state.isLoading,
        error: page.username.errorMessage,
      },
      passwordInputProps: {
        onChange: async (e) => {
          page.password.value = e.target.value;
          refresh?.();
        },
        placeholder: "Password",
        value: page.password.value,
        disabled: state.isLoading,
        error: page.password.errorMessage,
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
        onClick: getAsyncRefresh(page.signUp.bind(page), refresh),
        text: "Sign Up",
        disabled:
          state.isLoading || !page.username.value || !page.password.value, // TODO: Move in a method getIsDisabled()?
      },
    },
  };
};
