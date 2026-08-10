import { TArticle, TState } from "./state";

export function isMine(article: TArticle, state: TState): boolean {
  return article.authorName === state.name;
}
