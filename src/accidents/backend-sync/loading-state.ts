import { createInitialState, TState } from "../../essence/state";

// Open/Closed (docs/solid-in-this-repo.md#openclosed), same shape as
// TPaginationState (src/accidents/pagination/pagination-state.ts): TState
// is never edited to grow an accident-only field, only extended by
// intersection. isLoaderShown isn't essence -- it's not a domain fact
// about articles/comments/identity, it's "is the initial fetch from the
// backend still in flight" (docs/realworld-essence-checklist.md's "Part
// 3"), the same category of thing TConfirm/navigation/persistence
// already keep out of TState.
export type TLoadingState = TState & {
  isLoaderShown: boolean;
};

// Liskov Substitution (docs/solid-in-this-repo.md#liskov-substitution):
// a TLoadingState IS a TState (plus more), so it's handed straight to
// composeApp -- which has never heard of loading -- with no adapter,
// same as TPaginationState is handed straight to selectVisibleArticles.
export function createInitialLoadingState(): TLoadingState {
  return { ...createInitialState(), isLoaderShown: true };
}
