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
  isRegister: boolean;
  onRegisterClick: () => void;
  // undefined -- a guest -- not a separate isGuest/signedIn flag, same
  // presence-not-flag rule as sign-in-view-model.ts's own signedInName.
  signedInName: string | undefined;
  // "" for a guest, or a signed-in name that never set one through
  // Settings -- same contract as selectAvatarUrl itself.
  avatarUrl: string;
  // The signed-in name (with avatar) links to your own profile -- not a
  // Sign Out control. Real spec keeps those as two separate things
  // (docs/spec/pages.md's Header entry); Sign Out now lives on the
  // Settings page instead (docs/realworld-essence-checklist.md's
  // header-navigation entry).
  onProfileClick: () => void;
  isEditor: boolean;
  onNewArticleClick: () => void;
  isSettings: boolean;
  onSettingsClick: () => void;
};

export function compileHeaderViewModel(
  page: TPage,
  onGoHome: () => void,
  signedInName: string | undefined,
  avatarUrl: string,
  onLogin: () => void,
  onRegister: () => void,
  onNewArticle: () => void,
  onSettings: () => void,
  onProfile: () => void,
): THeaderProps {
  return {
    isHome: page === "home",
    onHomeClick: onGoHome,
    isLogin: page === "login",
    onLoginClick: onLogin,
    isRegister: page === "register",
    onRegisterClick: onRegister,
    signedInName,
    avatarUrl,
    onProfileClick: onProfile,
    isEditor: page === "editor",
    onNewArticleClick: onNewArticle,
    isSettings: page === "settings",
    onSettingsClick: onSettings,
  };
}
