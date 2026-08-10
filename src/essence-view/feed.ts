import { TArticle, TState } from "../essence/state";
import { selectVisibleArticles } from "../essence/feed";
import { isFollowing } from "../essence/follow";

export function renderFeed(state: TState): string {
  const items = selectVisibleArticles(state)
    .map((article) => renderArticlePreview(article, state))
    .join("");

  return `<div>
  <nav>
    <button data-action="set-filter" data-filter-name="global">Global Feed</button>
    <button data-action="set-filter" data-filter-name="personal">Your Feed</button>
  </nav>
  <ul>${items}</ul>
</div>`;
}

function renderArticlePreview(article: TArticle, state: TState): string {
  const tags = article.tags
    .map(
      (tag) =>
        `<li><button data-action="set-tag" data-tag="${tag}">${tag}</button></li>`,
    )
    .join("");
  const following = isFollowing(state, article.authorName);

  return `<li>
  <h2>${article.title}</h2>
  <p>${article.summary}</p>
  <span>${article.authorName}</span>
  <button data-action="toggle-follow" data-author-name="${article.authorName}">${following ? "Unfollow" : "Follow"}</button>
  <span>${article.createdAt}</span>
  <ul>${tags}</ul>
  <button data-action="toggle-favorite" data-title="${article.title}">${article.isFavorite ? "Unfavorite" : "Favorite"} (${article.favoritesCount})</button>
</li>`;
}
