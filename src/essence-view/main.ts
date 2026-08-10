import { createInitialState, TArticle, TFilterName, TState } from "../essence/state";
import { toggleFavorite } from "../essence/favorite";
import { toggleFollow } from "../essence/follow";
import { renderFeed } from "./feed";

// Sample data so there's something to click when the page opens.
// This is not essence — just a seed for manual verification, since
// "write a new article" isn't built yet (checklist §3).
const demoArticles: TArticle[] = [
  {
    title: "Welcome to Conduit",
    summary: "A place to share your knowledge.",
    body: "The essence of a Medium clone, built test-first.",
    tags: ["welcome", "conduit"],
    authorName: "alice",
    createdAt: "2026-01-01",
    favoritesCount: 2,
    isFavorite: false,
  },
  {
    title: "Grounding software in perception",
    summary: "Why essence comes before accident.",
    body: "If it isn't perceivable, it isn't essence.",
    tags: ["philosophy"],
    authorName: "bob",
    createdAt: "2026-01-05",
    favoritesCount: 5,
    isFavorite: true,
  },
];

let state: TState = { ...createInitialState(), articles: demoArticles };

function render(): void {
  const root = document.getElementById("app");
  if (root) root.innerHTML = renderFeed(state);
}

function handleClick(event: Event): void {
  if (!(event.target instanceof Element)) return;
  const actionEl = event.target.closest<HTMLElement>("[data-action]");
  if (!actionEl) return;

  const { action, title, authorName, tag, filterName } = actionEl.dataset;

  if (action === "toggle-favorite" && title) {
    state = toggleFavorite(state, title);
  } else if (action === "toggle-follow" && authorName) {
    state = toggleFollow(state, authorName);
  } else if (action === "set-tag") {
    const nextTag = tag || null;
    state = { ...state, activeTag: state.activeTag === nextTag ? null : nextTag };
  } else if (action === "set-filter" && filterName) {
    state = { ...state, filterName: filterName as TFilterName };
  } else {
    return;
  }

  render();
}

document.addEventListener("click", handleClick);
render();
