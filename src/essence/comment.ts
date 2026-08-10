import { TComment, TState } from "./state";

export function writeComment(
  state: TState,
  articleSlug: string,
  body: string,
  createdAt: string,
): TState {
  const comment: TComment = { articleSlug, authorName: state.name, body, createdAt };

  return { ...state, comments: [...state.comments, comment] };
}
