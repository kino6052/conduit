import { TState } from "./state";

// Same shape as changeName (src/essence/name.ts): a name's bio is an
// independent, perceivable fact attached to that name, not a field on some
// User/Person/Profile entity -- see TBio's own comment in state.ts. Only
// the acting identity's own bio is ever set (Settings edits "your" bio);
// any name's bio, including one that's never set one, is readable through
// selectBio.
export function setBio(state: TState, text: string): TState {
  return {
    ...state,
    bios: [...state.bios.filter((bio) => bio.name !== state.name), { name: state.name, text }],
  };
}

export function selectBio(state: TState, name: string): string {
  return state.bios.find((bio) => bio.name === name)?.text ?? "";
}
