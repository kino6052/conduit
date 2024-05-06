import { SettingsPage } from "../../../../../../model/pages/SettingsPage";
import { EPage } from "../../../../../../model/pages/types";
import { IAppState } from "../../../../../../model/types";
import { TAppProps } from "../../../types";
import { generateNavBarProps } from "../../selectors";

export const generateSettingsPageProps = (
  state: IAppState,
  refresh?: () => void,
): TAppProps<EPage.Settings> => {
  const page = state.currentPage as SettingsPage;
  return {
    navbarProps: generateNavBarProps(state, refresh),
    page: EPage.Settings,
    pageProps: {
      onMount: async () => {
        const result = page.initialize().then(() => {
          refresh?.();
        });

        refresh?.();

        return result;
      },
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
        placeholder: "Let the world know about you",
        value: page.username.value,
      },
      passwordInputProps: {
        onChange: async (e) => {
          page.password.value = e.target.value;
          refresh?.();
        },
        placeholder: "Let the world know about you",
        value: page.password.value,
      },
      imageUrlInputProps: {
        onChange: async (e) => {
          page.imageSrc.value = e.target.value;
          refresh?.();
        },
        placeholder: "Let the world know about you",
        value: page.imageSrc.value,
      },
      buttonProps: {
        onClick: async () => {
          page.saveChanges().then(() => {
            refresh?.();
          });
          refresh?.();
        },
        text: "Save",
        disabled: !page.username || !page.password,
      },
      logoutButtonProps: {
        onClick: async () => {
          page.logout().then(() => {
            refresh?.();
          });
          refresh?.();
        },
        text: "Logout",
      },
    },
  };
};
