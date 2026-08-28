// Own file, same reasoning as header-view-model.ts/sign-in-view-model.ts/
// profile-view-model.ts: a different derived composite
// (docs/solid-in-this-repo.md) -- editing the acting identity's own bio
// and avatar. Not username (that's Login's job -- "sign in as someone
// else" already covers renaming, docs/realworld-essence-checklist.md's
// Settings entry), and not email/password (no essence-grounded field
// exists for either -- see the same checklist entry).

import { selectBio, setBio } from "../../../essence/bio";
import { selectAvatarUrl, setAvatarUrl } from "../../../essence/avatar";
import { TGetState, TSetState } from "./view-model";

export type TSettingsViewModel = {
  bio: string;
  avatarUrl: string;
  onSaveClick: (bio: string, avatarUrl: string) => void;
  // Signing out isn't this file's own concern -- it's navigation-adjacent
  // state, same category as sign-in-view-model.ts's own onSignOutClick.
  // Threaded straight through from whatever the composition root already
  // uses for it (the same handler the header used to expose, before that
  // control moved here -- see the header-navigation checklist entry).
  onSignOutClick: () => void;
};

export function compileSettingsViewModel(
  getState: TGetState,
  setState: TSetState,
  onSignOutClick: () => void,
): TSettingsViewModel {
  const state = getState();
  return {
    bio: selectBio(state, state.name),
    avatarUrl: selectAvatarUrl(state, state.name),
    onSaveClick: (bio, avatarUrl) => {
      setState(setAvatarUrl(setBio(getState(), bio), avatarUrl));
    },
    onSignOutClick,
  };
}
