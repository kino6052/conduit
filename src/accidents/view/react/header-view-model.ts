// Which page you're on isn't essence -- it's navigation, an accident
// (src/accidents/navigation). Kept separate from view-model.ts for the
// same reason article-view-model.ts is its own file -- one derived
// composite (docs/solid-in-this-repo.md), the header, not mixed into the
// feed's.

import { TPage } from "../../navigation/navigation";

export type THeaderProps = {
  // No isOwnArticle-style stored flag here: recomputed from the current
  // page every time, same discipline as isMine.
  isHome: boolean;
  onHomeClick: () => void;
  isLogin: boolean;
  onLoginClick: () => void;
  // undefined -- a guest -- not a separate isGuest/signedIn flag, same
  // presence-not-flag rule as sign-in-view-model.ts's own signedInName.
  signedInName: string | undefined;
  onSignOutClick: () => void;
  isEditor: boolean;
  onNewArticleClick: () => void;
  isSettings: boolean;
  onSettingsClick: () => void;
};

export function compileHeaderViewModel(
  page: TPage,
  onGoHome: () => void,
  signedInName: string | undefined,
  onLogin: () => void,
  onSignOut: () => void,
  onNewArticle: () => void,
  onSettings: () => void,
): THeaderProps {
  return {
    isHome: page === "home",
    onHomeClick: onGoHome,
    isLogin: page === "login",
    onLoginClick: onLogin,
    signedInName,
    onSignOutClick: onSignOut,
    isEditor: page === "editor",
    onNewArticleClick: onNewArticle,
    isSettings: page === "settings",
    onSettingsClick: onSettings,
  };
}
