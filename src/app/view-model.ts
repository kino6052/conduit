// Follows docs/code-example.md's shape: pure logic + action runners,
// then a view-model compiler that turns state into props. The pure logic
// itself already lives in src/essence -- this file adds nothing to it,
// only wires it to closures a React component can call.

import { TArticle, TState } from "../essence/state";
import { selectVisibleArticles } from "../essence/feed";
import { toggleFavorite } from "../essence/favorite";
import { isFollowing, toggleFollow } from "../essence/follow";

export type TGetState = () => TState;
export type TSetState = (next: TState) => void;

// Global, un-nested action runners (bound inside the composition root) --
// same shape as code-example.md's onSquareClick/onJumpToMove.
export const onToggleFavorite = (
  title: string,
  getState: TGetState,
  setState: TSetState,
): void => {
  setState(toggleFavorite(getState(), title));
};

export const onToggleFollow = (
  authorName: string,
  getState: TGetState,
  setState: TSetState,
): void => {
  setState(toggleFollow(getState(), authorName));
};

export type TArticlePreviewProps = {
  title: string;
  summary: string;
  authorName: string;
  createdAt: string;
  tags: string[];
  favoriteLabel: string;
  onFavoriteClick: () => void;
  followLabel: string;
  onFollowClick: () => void;
};

export type TFeedViewModel = {
  articlePreviewProps: TArticlePreviewProps[];
};

function compileArticlePreviewProps(
  article: TArticle,
  state: TState,
  getState: TGetState,
  setState: TSetState,
): TArticlePreviewProps {
  return {
    title: article.title,
    summary: article.summary,
    authorName: article.authorName,
    createdAt: article.createdAt,
    tags: article.tags,
    favoriteLabel: `${article.isFavorite ? "Unfavorite" : "Favorite"} (${article.favoritesCount})`,
    onFavoriteClick: () => onToggleFavorite(article.title, getState, setState),
    followLabel: isFollowing(state, article.authorName) ? "Unfollow" : "Follow",
    onFollowClick: () => onToggleFollow(article.authorName, getState, setState),
  };
}

export function compileFeedViewModel(
  state: TState,
  getState: TGetState,
  setState: TSetState,
): TFeedViewModel {
  return {
    articlePreviewProps: selectVisibleArticles(state).map((article) =>
      compileArticlePreviewProps(article, state, getState, setState),
    ),
  };
}
