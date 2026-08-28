import { TState } from "./state";

export function deleteArticle(state: TState, title: string): TState {
  return {
    ...state,
    articles: state.articles.filter((article) => article.title !== title),
  };
}
