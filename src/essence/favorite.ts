import { TState } from "./state";

export function toggleFavorite(state: TState, title: string): TState {
  return {
    ...state,
    articles: state.articles.map((article) => {
      if (article.title !== title) return article;
      const isFavorite = !article.isFavorite;
      return {
        ...article,
        isFavorite,
        favoritesCount: article.favoritesCount + (isFavorite ? 1 : -1),
      };
    }),
  };
}
