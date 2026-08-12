import { TState } from "./state";

// Not "signIn"/"login"/"auth" -- none of those are entities on screen
// (docs/ontological-entities-in-this-repo.md rejects "User" outright: the
// only thing ever rendered is a name string in a byline). Establishing
// *how* that name gets set -- credentials, sessions, verification -- is
// accident and mostly still undecided (docs/realworld-essence-checklist.md,
// "Establishing 'who you are'"). This is only the state transition itself:
// the acting identity's name changes to a new one. Same shape as every
// other essence mutator (writeArticle, toggleFollow, ...).
export function changeName(state: TState, name: string): TState {
  return { ...state, name };
}
