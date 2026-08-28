import { TArticle, TState } from "./state";

export function toggleFavorite(state: TState, title: string): TState {
  return {
    ...state,
    articles: state.articles.map((article) =>
      article.title === title
        ? {
            ...article,
            favoritedBy: isFavoritedBy(article, state.name)
              ? article.favoritedBy.filter((name) => name !== state.name)
              : [...article.favoritedBy, state.name],
          }
        : article,
    ),
  };
}

export function isFavoritedBy(article: { favoritedBy: string[] }, name: string): boolean {
  return article.favoritedBy.includes(name);
}

// "Their favorited articles" (a profile's own, not just the feed's) --
// every article a given name favorited, regardless of who wrote it. Only
// answerable at all once favoritedBy replaced a per-viewer isFavorite
// boolean with the actual list.
export function selectArticlesFavoritedBy(state: TState, name: string): TArticle[] {
  return state.articles.filter((article) => isFavoritedBy(article, name));
}
