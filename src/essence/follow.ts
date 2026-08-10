import { TState } from "./state";

export function toggleFollow(state: TState, authorName: string): TState {
  return {
    ...state,
    followedAuthors: isFollowing(state, authorName)
      ? state.followedAuthors.filter((name) => name !== authorName)
      : [...state.followedAuthors, authorName],
  };
}

export function isFollowing(state: TState, authorName: string): boolean {
  return state.followedAuthors.includes(authorName);
}
