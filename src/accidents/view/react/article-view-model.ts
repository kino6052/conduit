// The article-detail counterpart to view-model.ts's feed compiler --
// same shape, same reused essence actions, one article instead of a list.

import { TState } from "../../../essence/state";
import { selectArticle } from "../../../essence/article";
import { selectComments } from "../../../essence/comment";
import { isMine } from "../../../essence/ownership";
import {
  TGetState,
  TSetState,
  TFavoriteFollowProps,
  compileFavoriteFollowProps,
  onWriteComment,
  onDeleteArticle,
} from "./view-model";

export type TCommentProps = {
  body: string;
  authorName: string;
};

export type TArticleDetailViewModel = TFavoriteFollowProps & {
  title: string;
  body: string;
  tags: string[];
  authorName: string;
  commentProps: TCommentProps[];
  onCommentClick: (body: string) => void;
  isOwnArticle: boolean;
  onDeleteClick: () => void;
};

export function compileArticleDetailViewModel(
  state: TState,
  articleTitle: string,
  getState: TGetState,
  setState: TSetState,
  getCreatedAt: () => string,
): TArticleDetailViewModel | undefined {
  const article = selectArticle(state, articleTitle);
  if (!article) return undefined;

  return {
    title: article.title,
    body: article.body,
    tags: article.tags,
    authorName: article.authorName,
    commentProps: selectComments(state, article.title).map((comment) => ({
      body: comment.body,
      authorName: comment.authorName,
    })),
    onCommentClick: (body: string) =>
      onWriteComment(article.title, body, getCreatedAt(), getState, setState),
    isOwnArticle: isMine(article, state),
    onDeleteClick: () => onDeleteArticle(article.title, getState, setState),
    ...compileFavoriteFollowProps(article, state, getState, setState),
  };
}
