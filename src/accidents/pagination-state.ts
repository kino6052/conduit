import { TArticle, TState } from "../essence/state";
import { selectVisibleArticles } from "../essence/feed";
import { paginate } from "./pagination";

// Open/Closed (docs/solid-in-this-repo.md#openclosed): TState is closed --
// never edited to grow accident-only fields. Extended instead, by
// intersection, the same way a Decorator wraps an object with new behavior
// without touching the original class.
export type TPaginationState = TState & {
  page: number;
  pageSize: number;
};

export function createInitialPaginationState(essence: TState): TPaginationState {
  return { ...essence, page: 1, pageSize: 10 };
}

// Liskov Substitution (docs/solid-in-this-repo.md#liskov-substitution):
// TPaginationState IS a TState (plus more), so it's handed straight to
// selectVisibleArticles -- an essence function that has never heard of
// pagination -- with no adapter. If this needed a wrapper/mapper to satisfy
// selectVisibleArticles, that would be the LSP violation.
export function selectVisiblePage(state: TPaginationState): TArticle[] {
  return paginate(selectVisibleArticles(state), state.page, state.pageSize);
}
