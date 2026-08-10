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

export function deleteComment(state: TState, target: TComment): TState {
  return {
    ...state,
    comments: state.comments.filter((comment) => !isSameComment(comment, target)),
  };
}

function isSameComment(a: TComment, b: TComment): boolean {
  return (
    a.articleTitle === b.articleTitle &&
    a.authorName === b.authorName &&
    a.body === b.body &&
    a.createdAt === b.createdAt
  );
}
