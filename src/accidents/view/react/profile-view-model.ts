// Own file, same reasoning as header-view-model.ts/sign-in-view-model.ts:
// a different derived composite (docs/solid-in-this-repo.md) than the
// feed's -- "an author, and the articles they wrote" -- even though it
// reuses the feed's own compileArticlePreviewProps to compile them, since
// an article preview looks and behaves identically wherever it's shown.

import { TState } from "../../../essence/state";
import { selectArticlesByAuthor } from "../../../essence/article";
import { isFollowing } from "../../../essence/follow";
import { selectArticlesFavoritedBy } from "../../../essence/favorite";
import { selectBio } from "../../../essence/bio";
import { selectAvatarUrl } from "../../../essence/avatar";
import {
  TGetState,
  TSetState,
  TArticlePreviewProps,
  compileArticlePreviewProps,
  onToggleFollow,
} from "./view-model";

export type TProfileViewModel = {
  authorName: string;
  // "" when this name never set one through Settings -- not an error, same
  // as selectBio/selectAvatarUrl's own contract.
  bio: string;
  avatarUrl: string;
  // True only for the acting identity's own profile -- the real Profile
  // page shows "Edit Profile Settings" here instead of a Follow button,
  // since following yourself isn't a meaningful action
  // (docs/realworld-essence-checklist.md's Profile page entry).
  isOwnProfile: boolean;
  followLabel: string;
  onFollowClick: () => void;
  onEditSettingsClick: () => void;
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
  onOpenSettings: () => void,
): TProfileViewModel {
  const toPreviewProps = (article: (typeof state.articles)[number]) =>
    compileArticlePreviewProps(article, state, getState, setState, onOpenArticle, onOpenProfile);

  return {
    authorName,
    bio: selectBio(state, authorName),
    avatarUrl: selectAvatarUrl(state, authorName),
    isOwnProfile: authorName === state.name,
    followLabel: isFollowing(state, authorName) ? "Unfollow" : "Follow",
    onFollowClick: () => onToggleFollow(authorName, getState, setState),
    onEditSettingsClick: onOpenSettings,
    articlePreviewProps: selectArticlesByAuthor(state, authorName).map(toPreviewProps),
    favoritedArticlePreviewProps: selectArticlesFavoritedBy(state, authorName).map(toPreviewProps),
  };
}
