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
  TButtonProps,
  compileArticlePreviewProps,
  onToggleFollow,
} from "./view-model";

export type TProfileViewModel = {
  authorName: string;
  // "" when this name never set one through Settings -- not an error, same
  // as selectBio/selectAvatarUrl's own contract.
  bio: string;
  avatarUrl: string;
  // On your own profile this is "Edit Profile Settings" -> Settings;
  // on anyone else's it's "Follow"/"Unfollow" -> toggleFollow. No
  // isOwnProfile flag alongside it -- same "no stored flag standing in
  // for a comparison anyone could make themselves" rule isMine already
  // follows (docs/solid-in-this-repo.md's SRP section), just applied one
  // level up: the component only ever needed one button, never the fact
  // of which case it was.
  buttonProps: TButtonProps;
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

  const buttonProps: TButtonProps =
    authorName === state.name
      ? { label: "Edit Profile Settings", onClick: onOpenSettings }
      : {
          label: isFollowing(state, authorName) ? "Unfollow" : "Follow",
          onClick: () => onToggleFollow(authorName, getState, setState),
        };

  return {
    authorName,
    bio: selectBio(state, authorName),
    avatarUrl: selectAvatarUrl(state, authorName),
    buttonProps,
    articlePreviewProps: selectArticlesByAuthor(state, authorName).map(toPreviewProps),
    favoritedArticlePreviewProps: selectArticlesFavoritedBy(state, authorName).map(toPreviewProps),
  };
}
