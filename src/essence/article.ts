import { TArticle, TState } from "./state";

export function selectArticle(state: TState, title: string): TArticle | undefined {
  return state.articles.find((article) => article.title === title);
}
