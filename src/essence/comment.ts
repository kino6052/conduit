import { TComment, TState } from "./state";

export function writeComment(
  state: TState,
  articleTitle: string,
  body: string,
  createdAt: string,
): TState {
  const comment: TComment = { articleTitle, authorName: state.name, body, createdAt };

  return { ...state, comments: [...state.comments, comment] };
}

export function selectComments(state: TState, articleTitle: string): TComment[] {
  return state.comments.filter((comment) => comment.articleTitle === articleTitle);
}
