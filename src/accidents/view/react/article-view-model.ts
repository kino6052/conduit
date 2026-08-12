// The article-detail counterpart to view-model.ts's feed compiler --
// same shape, same reused essence actions, one article instead of a list.

import { TState } from "../../../essence/state";
import { selectArticle } from "../../../essence/article";
import { selectComments } from "../../../essence/comment";
import { isMine } from "../../../essence/ownership";
import { renderMarkdownToHtml } from "../../markdown/markdown";
import {
  TGetState,
  TSetState,
  TFavoriteFollowProps,
  compileFavoriteFollowProps,
  onWriteComment,
  onDeleteArticle,
  onDeleteComment,
} from "./view-model";

export type TCommentProps = {
  body: string;
  authorName: string;
  // Same "no isOwnArticle-style flag" rule as TArticleDetailViewModel's
  // onDeleteClick below -- the control's own presence is the only signal,
  // recomputed via isMine every time, not cached.
  onDeleteClick: (() => void) | undefined;
};

export type TArticleDetailViewModel = TFavoriteFollowProps & {
  title: string;
  // Rendered, not raw source -- the checklist treats "readable text" as
  // essence and the markdown-vs-plain-text-vs-rich-text choice as accident
  // (docs/realworld-essence-checklist.md). This is that accident's output,
  // computed here (the tested layer) so components.ts stays a dumb
  // prop-to-DOM mapping, same split as the rest of this file's props.
  bodyHtml: string;
  tags: string[];
  authorName: string;
  commentProps: TCommentProps[];
  onCommentClick: (body: string) => void;
  // No separate "isOwnArticle" flag -- there's nothing on screen that
  // directly shows ownership, only a Delete Article button that either
  // exists or doesn't (docs/ontological-entities-in-this-repo.md: "if
  // something doesn't have a perceivable correlate, it can't be an
  // entity"). The control's own presence is the only signal.
  onDeleteClick: (() => void) | undefined;
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
    bodyHtml: renderMarkdownToHtml(article.body),
    tags: article.tags,
    authorName: article.authorName,
    commentProps: selectComments(state, article.title).map((comment) => ({
      body: comment.body,
      authorName: comment.authorName,
      onDeleteClick: isMine(comment, state)
        ? () => onDeleteComment(comment, getState, setState)
        : undefined,
    })),
    onCommentClick: (body: string) =>
      onWriteComment(article.title, body, getCreatedAt(), getState, setState),
    onDeleteClick: isMine(article, state)
      ? () => onDeleteArticle(article.title, getState, setState)
      : undefined,
    ...compileFavoriteFollowProps(article, state, getState, setState),
  };
}
