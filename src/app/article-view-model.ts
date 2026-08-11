// The article-detail counterpart to view-model.ts's feed compiler --
// same shape, same reused essence actions, one article instead of a list.

import { TState } from "../essence/state";
import { selectArticle } from "../essence/article";
import { TGetState, TSetState, TFavoriteFollowProps, compileFavoriteFollowProps } from "./view-model";

export type TArticleDetailViewModel = TFavoriteFollowProps & {
  title: string;
  body: string;
  tags: string[];
  authorName: string;
};

export function compileArticleDetailViewModel(
  state: TState,
  articleTitle: string,
  getState: TGetState,
  setState: TSetState,
): TArticleDetailViewModel | undefined {
  const article = selectArticle(state, articleTitle);
  if (!article) return undefined;

  return {
    title: article.title,
    body: article.body,
    tags: article.tags,
    authorName: article.authorName,
    ...compileFavoriteFollowProps(article, state, getState, setState),
  };
}
