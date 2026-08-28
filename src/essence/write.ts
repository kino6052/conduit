import { TArticle, TState } from "./state";

export type TDraftArticle = Pick<TArticle, "title" | "summary" | "body" | "tags" | "createdAt">;

export function writeArticle(state: TState, draft: TDraftArticle): TState {
  const article: TArticle = {
    ...draft,
    authorName: state.name,
    favoritesCount: 0,
    isFavorite: false,
  };

  return { ...state, articles: [...state.articles, article] };
}
