import { SettingsPage } from "../../../../../../app/pages/SettingsPage";
import { EPage, IPage } from "../../../../../../app/pages/types";
import { TAppProps } from "../../../types";
import { getAsyncRefresh } from "../../../utils/utils";
import { generateNavBarProps } from "../../selectors";

export const generateSettingsPageProps = (
  page: IPage,
  refresh?: () => void,
): TAppProps<EPage.Settings> => {
  const _page = page as SettingsPage;
  return {
    navbarProps: generateNavBarProps(_page, refresh),
    page: EPage.Settings,
    pageProps: {
      onMount: async () => {},
      bioInputProps: {
        onChange: async (e) => {
          _page.bio.value = e.target.value;
          refresh?.();
        },
        placeholder: "Let the world know about you",
        value: _page.bio.value,
      },
      usernameInputProps: {
        onChange: async (e) => {
          _page.username.value = e.target.value;
          refresh?.();
        },
        placeholder: "Username",
        value: _page.username.value,
      },
      passwordInputProps: {
        onChange: async (e) => {
          _page.password.value = e.target.value;
          refresh?.();
        },
        placeholder: "Password",
        value: _page.password.value,
      },
      imageUrlInputProps: {
        onChange: async (e) => {
          _page.imageSrc.value = e.target.value;
          refresh?.();
        },
        placeholder: "Profile Picture URL",
        value: _page.imageSrc.value,
      },
      buttonProps: {
        onClick: getAsyncRefresh(async () => _page.saveControl.onActivate?.(), refresh),
        text: "Save",
        disabled: _page.saveControl.isDisabled,
      },
      logoutButtonProps: {
        onClick: getAsyncRefresh(async () => _page.logoutControl.onActivate?.(), refresh),
        text: "Logout",
      },
    },
  };
};
