import { TArticle, TState } from "./state";

export function selectVisibleArticles(state: TState): TArticle[] {
  const { activeTag, articles, filterName, followedAuthors } = state;

  const byFollowedAuthors =
    filterName === "personal"
      ? articles.filter((article) => followedAuthors.includes(article.authorName))
      : articles;

  if (activeTag === null) return byFollowedAuthors;
  return byFollowedAuthors.filter((article) => article.tags.includes(activeTag));
}
