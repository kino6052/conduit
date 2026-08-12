import { TArticle, TState } from "./state";

export function selectArticle(state: TState, title: string): TArticle | undefined {
  return state.articles.find((article) => article.title === title);
}

export function selectArticlesByAuthor(state: TState, authorName: string): TArticle[] {
  return state.articles.filter((article) => article.authorName === authorName);
}
