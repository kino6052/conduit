import { TNavbarProps } from "../../io/ui/view/components/Navbar/types";
import { ETabVariant, TTabProps } from "../../io/ui/view/components/Tab/types";
import { EPage } from "../../types";
import { AppState } from "../data/app";

export const provideNavbarProps = (): TNavbarProps => {
  const username = AppState.currentUserId;

  const isLogedIn = !!username;

  return {
    tabs: [
      {
        id: EPage.Home,
        text: "Home",
        variant: ETabVariant.Menu,
      },
      isLogedIn && {
        id: EPage.NewArticle,
        icon: "edit",
        text: "New Post",
        variant: ETabVariant.Menu,
      },
      isLogedIn && {
        id: EPage.Settings,
        icon: "settings",
        text: "Settings",
        variant: ETabVariant.Menu,
      },
      isLogedIn && {
        id: EPage.Profile,
        icon: "person",
        text: username,
        variant: ETabVariant.Menu,
      },
      !isLogedIn && {
        id: EPage.SignIn,
        text: "Sign In",
        variant: ETabVariant.Menu,
      },
      !isLogedIn && {
        id: EPage.SignUp,
        text: "Sign Up",
        variant: ETabVariant.Menu,
      },
    ].filter(Boolean) as TTabProps[],
  };
};
