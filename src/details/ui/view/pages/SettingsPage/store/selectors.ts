import { SettingsPage } from "../../../../../../app/pages/SettingsPage";
import { EPage } from "../../../../../../app/pages/types";
import { IAppState } from "../../../../../../app/types";
import { TAppProps } from "../../../types";
import { getAsyncRefresh } from "../../../utils/utils";
import { generateNavBarProps } from "../../selectors";

export const generateSettingsPageProps = (
  state: IAppState,
  refresh?: () => void,
): TAppProps<EPage.Settings> => {
  const page = state.currentPage as SettingsPage;
  return {
    navbarProps: generateNavBarProps(page, refresh),
    page: EPage.Settings,
    pageProps: {
      onMount: async () => {},
      bioInputProps: {
        onChange: async (e) => {
          page.bio.value = e.target.value;
          refresh?.();
        },
        placeholder: "Let the world know about you",
        value: page.bio.value,
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
      imageUrlInputProps: {
        onChange: async (e) => {
          page.imageSrc.value = e.target.value;
          refresh?.();
        },
        placeholder: "Profile Picture URL",
        value: page.imageSrc.value,
      },
      buttonProps: {
        onClick: getAsyncRefresh(async () => page.saveControl.onActivate?.(), refresh),
        text: "Save",
        disabled: page.saveControl.isDisabled,
      },
      logoutButtonProps: {
        onClick: getAsyncRefresh(async () => page.logoutControl.onActivate?.(), refresh),
        text: "Logout",
      },
    },
  };
};
