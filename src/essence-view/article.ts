import { TArticle, TComment, TState } from "../essence/state";
import { isFollowing } from "../essence/follow";
import { isMine } from "../essence/ownership";

export function renderArticleDetail(
  article: TArticle,
  comments: TComment[],
  state: TState,
): string {
  const following = isFollowing(state, article.authorName);
  const tags = article.tags.map((tag) => `<li>${tag}</li>`).join("");

  const ownerControls = isMine(article, state)
    ? `<button data-action="edit-article" data-title="${article.title}">Edit Article</button>
  <button data-action="delete-article" data-title="${article.title}">Delete Article</button>`
    : "";

  const commentsHtml = comments
    .map(
      (comment) => `<li>
    <p>${comment.body}</p>
    <span>${comment.authorName}</span>
  </li>`,
    )
    .join("");

  return `<article>
  <h1>${article.title}</h1>
  <p>${article.body}</p>
  <ul>${tags}</ul>
  <span>${article.authorName}</span>
  <button data-action="toggle-follow" data-author-name="${article.authorName}">${following ? "Unfollow" : "Follow"}</button>
  <button data-action="toggle-favorite" data-title="${article.title}">${article.isFavorite ? "Unfavorite" : "Favorite"} (${article.favoritesCount})</button>
  ${ownerControls}
  <ul>${commentsHtml}</ul>
  <form data-action="post-comment" data-article-title="${article.title}">
    <textarea name="body" placeholder="Write a comment..."></textarea>
    <button type="submit">Post Comment</button>
  </form>
</article>`;
}
