import { TNavbarProps } from "../../components/Navbar/types";
import { ETabVariant, TTabProps } from "../../components/Tab/types";
import { EPage } from "../../types";
import { IEvent } from "../../utils/events";
import { RefreshSubject } from "../common.logic";
import { AppState } from "../data/app";

export const hasPressedEnter = (event: IEvent) => {
  const _event = event.event as KeyboardEvent;
  return event.type === "onKeyDown" && _event.key === "Enter";
};

export const updatePage = (page?: EPage) => {
  if (page) {
    AppState.currentPage = page;
  }

  RefreshSubject.next({});
};

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
