import { TArticle, TState } from "../../../essence/state";
import { selectVisibleArticles } from "../../../essence/feed";
import { isFollowing } from "../../../essence/follow";
import { isFavoritedBy } from "../../../essence/favorite";

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
  const favorited = isFavoritedBy(article, state.name);

  return `<li>
  <h2><button data-action="open-article" data-title="${article.title}">${article.title}</button></h2>
  <p>${article.summary}</p>
  <span>${article.authorName}</span>
  <button data-action="toggle-follow" data-author-name="${article.authorName}">${following ? "Unfollow" : "Follow"}</button>
  <span>${article.createdAt}</span>
  <ul>${tags}</ul>
  <button data-action="toggle-favorite" data-title="${article.title}">${favorited ? "Unfavorite" : "Favorite"} (${article.favoritedBy.length})</button>
</li>`;
}
