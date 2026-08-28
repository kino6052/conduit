import { TState } from "./state";

// Works on anything attributed to an author -- an article, a comment.
export function isMine({ authorName }: { authorName: string }, state: TState): boolean {
  return authorName === state.name;
}
