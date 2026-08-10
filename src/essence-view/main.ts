import { TFilterName, TState } from "../essence/state";
import { toggleFavorite } from "../essence/favorite";
import { toggleFollow } from "../essence/follow";
import { renderFeed } from "./feed";
import { renderSidebar } from "./sidebar";
import { namedStates } from "./states";

let activeStateName = namedStates[0].name;
let state: TState = namedStates[0].state;

function render(): void {
  const sidebar = document.getElementById("sidebar");
  const app = document.getElementById("app");
  if (sidebar) {
    sidebar.innerHTML = renderSidebar(
      namedStates.map((named) => named.name),
      activeStateName,
    );
  }
  if (app) app.innerHTML = renderFeed(state);
}

function handleClick(event: Event): void {
  if (!(event.target instanceof Element)) return;
  const actionEl = event.target.closest<HTMLElement>("[data-action]");
  if (!actionEl) return;

  const { action, title, authorName, tag, filterName, stateName } = actionEl.dataset;

  if (action === "select-state" && stateName) {
    const named = namedStates.find((candidate) => candidate.name === stateName);
    if (!named) return;
    activeStateName = named.name;
    state = named.state;
  } else if (action === "toggle-favorite" && title) {
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
