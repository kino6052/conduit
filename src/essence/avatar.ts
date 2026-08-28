import { TState } from "./state";

// Same shape as setBio (src/essence/bio.ts) and changeName
// (src/essence/name.ts): a name's avatar image is an independent,
// perceivable fact attached to that name, not a field on some
// User/Person/Profile entity -- see TAvatarUrl's own comment in state.ts.
// Only the acting identity's own avatar is ever set (Settings edits
// "your" avatar); any name's avatar, including one that's never set one,
// is readable through selectAvatarUrl.
export function setAvatarUrl(state: TState, url: string): TState {
  return {
    ...state,
    avatarUrls: [...state.avatarUrls.filter((avatar) => avatar.name !== state.name), { name: state.name, url }],
  };
}

export function selectAvatarUrl(state: TState, name: string): string {
  return state.avatarUrls.find((avatar) => avatar.name === name)?.url ?? "";
}
