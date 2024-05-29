import { SignUpPage } from "../../../../../../app/pages/SignUpPage";
import { EPage, IPage } from "../../../../../../app/pages/types";
import { TAppProps } from "../../../types";
import { getAsyncRefresh } from "../../../utils/utils";
import { generateNavBarProps } from "../../selectors";

export const generateSignUpPageProps = (
  page: IPage,
  refresh?: () => void,
): TAppProps<EPage.SignUp> => {
  const _page = page as SignUpPage;
  return {
    navbarProps: generateNavBarProps(_page, refresh),
    page: EPage.SignUp,
    pageProps: {
      onMount: async () => {},
      usernameInputProps: {
        onChange: async (e) => {
          _page.username.value = e.target.value;
          refresh?.();
        },
        placeholder: "Username",
        value: _page.username.value,
        disabled: _page.username.isDisabled,
        error: _page.username.errorMessage,
      },
      passwordInputProps: {
        onChange: async (e) => {
          _page.password.value = e.target.value;
          refresh?.();
        },
        placeholder: "Password",
        value: _page.password.value,
        disabled: _page.password.isDisabled,
        error: _page.password.errorMessage,
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
        onClick: getAsyncRefresh(
          async () => _page.submitControl.onActivate?.(),
          refresh,
        ),
        text: "Sign Up",
        disabled: _page.submitControl.isDisabled,
      },
    },
  };
};
