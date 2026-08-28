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
};

export function compileSettingsViewModel(
  getState: TGetState,
  setState: TSetState,
): TSettingsViewModel {
  const state = getState();
  return {
    bio: selectBio(state, state.name),
    avatarUrl: selectAvatarUrl(state, state.name),
    onSaveClick: (bio, avatarUrl) => {
      setState(setAvatarUrl(setBio(getState(), bio), avatarUrl));
    },
  };
}
