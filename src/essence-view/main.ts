import { TFilterName, TState } from "../essence/state";
import { toggleFavorite } from "../essence/favorite";
import { toggleFollow } from "../essence/follow";
import { writeArticle } from "../essence/write";
import { deleteArticle } from "../essence/delete";
import { selectArticle } from "../essence/article";
import { writeComment, selectComments } from "../essence/comment";
import { renderFeed } from "./feed";
import { renderSidebar } from "./sidebar";
import { renderEditor } from "./editor";
import { renderArticleDetail } from "./article";
import { namedStates } from "./states";

let activeStateName = namedStates[0].name;
let state: TState = namedStates[0].state;
let activeArticleTitle: string | null = namedStates[0].openArticleTitle ?? null;

function render(): void {
  const sidebar = document.getElementById("sidebar");
  const app = document.getElementById("app");
  const editor = document.getElementById("editor");
  const articleEl = document.getElementById("article");

  if (sidebar) {
    sidebar.innerHTML = renderSidebar(
      namedStates.map((named) => named.name),
      activeStateName,
    );
  }
  if (app) app.innerHTML = renderFeed(state);
  if (editor) editor.innerHTML = renderEditor();

  const openArticle = activeArticleTitle ? selectArticle(state, activeArticleTitle) : undefined;
  if (!openArticle) activeArticleTitle = null;
  if (articleEl) {
    articleEl.innerHTML = openArticle
      ? renderArticleDetail(openArticle, selectComments(state, openArticle.title), state)
      : "";
  }
}

function publishFromForm(form: HTMLFormElement): void {
  const data = new FormData(form);
  const tags = String(data.get("tags") ?? "")
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  state = writeArticle(state, {
    title: String(data.get("title") ?? ""),
    summary: String(data.get("summary") ?? ""),
    body: String(data.get("body") ?? ""),
    tags,
    createdAt: new Date().toISOString().slice(0, 10),
  });
}

function postCommentFromForm(form: HTMLFormElement): void {
  const articleTitle = form.dataset.articleTitle;
  if (!articleTitle) return;
  const data = new FormData(form);
  const body = String(data.get("body") ?? "");
  if (!body) return;

  state = writeComment(state, articleTitle, body, new Date().toISOString().slice(0, 10));
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
    activeArticleTitle = named.openArticleTitle ?? null;
  } else if (action === "toggle-favorite" && title) {
    state = toggleFavorite(state, title);
  } else if (action === "toggle-follow" && authorName) {
    state = toggleFollow(state, authorName);
  } else if (action === "set-tag") {
    const nextTag = tag || null;
    state = { ...state, activeTag: state.activeTag === nextTag ? null : nextTag };
  } else if (action === "set-filter" && filterName) {
    state = { ...state, filterName: filterName as TFilterName };
  } else if (action === "publish-article" && actionEl instanceof HTMLFormElement) {
    event.preventDefault();
    publishFromForm(actionEl);
  } else if (action === "open-article" && title) {
    activeArticleTitle = title;
  } else if (action === "delete-article" && title) {
    state = deleteArticle(state, title);
  } else if (action === "post-comment" && actionEl instanceof HTMLFormElement) {
    event.preventDefault();
    postCommentFromForm(actionEl);
  } else {
    return;
  }

  render();
}

document.addEventListener("click", handleClick);
render();
