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
