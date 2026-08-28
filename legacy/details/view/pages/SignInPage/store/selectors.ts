import { SignInPage } from "../../../../../app/entities/pages/SignInPage";
import { EPage, IPage } from "../../../../../app/entities/pages/types";
import { TAppProps } from "../../../types";
import { getAsyncRefresh } from "../../../utils/utils";
import { generateNavBarProps } from "../../selectors";

export const generateSignInPageProps = (
  page: IPage,
  refresh?: () => void,
): TAppProps<EPage.SignIn> => {
  const _page = page as SignInPage;
  return {
    navbarProps: generateNavBarProps(_page, refresh),
    page: EPage.SignIn,
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
        text: "Sign In",
        disabled: _page.submitControl.isDisabled,
      },
    },
  };
};
