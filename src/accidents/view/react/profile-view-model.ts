// Own file, same reasoning as header-view-model.ts/sign-in-view-model.ts:
// a different derived composite (docs/solid-in-this-repo.md) than the
// feed's -- "an author, and the articles they wrote" -- even though it
// reuses the feed's own compileArticlePreviewProps to compile them, since
// an article preview looks and behaves identically wherever it's shown.

import { TState } from "../../../essence/state";
import { selectArticlesByAuthor } from "../../../essence/article";
import { isFollowing } from "../../../essence/follow";
import { selectArticlesFavoritedBy } from "../../../essence/favorite";
import {
  TGetState,
  TSetState,
  TArticlePreviewProps,
  compileArticlePreviewProps,
  onToggleFollow,
} from "./view-model";

export type TProfileViewModel = {
  authorName: string;
  followLabel: string;
  onFollowClick: () => void;
  articlePreviewProps: TArticlePreviewProps[];
  // Only answerable at all once favoriting became a real relation
  // (TArticle.favoritedBy) instead of a per-viewer isFavorite boolean --
  // see docs/realworld-essence-checklist.md's Profile page entry.
  // Regardless of who wrote them, same as the feed itself never
  // restricting favoriting to your own articles.
  favoritedArticlePreviewProps: TArticlePreviewProps[];
};

export function compileProfileViewModel(
  state: TState,
  authorName: string,
  getState: TGetState,
  setState: TSetState,
  onOpenArticle: (title: string) => void,
  onOpenProfile: (authorName: string) => void,
): TProfileViewModel {
  const toPreviewProps = (article: (typeof state.articles)[number]) =>
    compileArticlePreviewProps(article, state, getState, setState, onOpenArticle, onOpenProfile);

  return {
    authorName,
    followLabel: isFollowing(state, authorName) ? "Unfollow" : "Follow",
    onFollowClick: () => onToggleFollow(authorName, getState, setState),
    articlePreviewProps: selectArticlesByAuthor(state, authorName).map(toPreviewProps),
    favoritedArticlePreviewProps: selectArticlesFavoritedBy(state, authorName).map(toPreviewProps),
  };
}
