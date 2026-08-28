import { TArticle, TState } from "./state";

export type TArticleEdits = Pick<TArticle, "title" | "summary" | "body" | "tags">;

export function editArticle(
  state: TState,
  originalTitle: string,
  edits: TArticleEdits,
): TState {
  return {
    ...state,
    articles: state.articles.map((article) =>
      article.title === originalTitle ? { ...article, ...edits } : article,
    ),
  };
}
