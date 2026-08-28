// Follows docs/code-example.md's shape: pure logic + action runners,
// then a view-model compiler that turns state into props. The pure logic
// itself already lives in src/essence -- this file adds nothing to it,
// only wires it to closures a React component can call.

import { TArticle, TComment, TFilterName, TState } from "../../../essence/state";
import { selectVisibleArticles } from "../../../essence/feed";
import { toggleFavorite, isFavoritedBy } from "../../../essence/favorite";
import { isFollowing, toggleFollow } from "../../../essence/follow";
import { selectAvatarUrl } from "../../../essence/avatar";
import { writeArticle, TDraftArticle } from "../../../essence/write";
import { writeComment, deleteComment } from "../../../essence/comment";
import { deleteArticle } from "../../../essence/delete";
import { selectPopularTags } from "../../popular-tags/popular-tags";

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

export const onWriteArticle = (
  draft: TDraftArticle,
  getState: TGetState,
  setState: TSetState,
): void => {
  setState(writeArticle(getState(), draft));
};

export const onWriteComment = (
  articleTitle: string,
  body: string,
  createdAt: string,
  getState: TGetState,
  setState: TSetState,
): void => {
  setState(writeComment(getState(), articleTitle, body, createdAt));
};

export const onDeleteArticle = (
  title: string,
  getState: TGetState,
  setState: TSetState,
): void => {
  setState(deleteArticle(getState(), title));
};

// A comment is identified by its own content, not a synthetic id -- same
// natural-key rule as deleteComment itself (src/essence/comment.ts).
export const onDeleteComment = (
  comment: TComment,
  getState: TGetState,
  setState: TSetState,
): void => {
  setState(deleteComment(getState(), comment));
};

export const onSetTag = (tag: string, getState: TGetState, setState: TSetState): void => {
  const state = getState();
  setState({ ...state, activeTag: state.activeTag === tag ? null : tag });
};

// A dedicated clear, not "click the same tag again" -- that only works if
// you can still see the tag you clicked to filter by, which the popular
// tags widget and the feed itself don't otherwise make obvious once
// you've scrolled past it. Same effect as onSetTag toggling itself off,
// just reachable without knowing which tag is even active.
export const onClearTag = (getState: TGetState, setState: TSetState): void => {
  setState({ ...getState(), activeTag: null });
};

export const onSetFilter = (
  filterName: TFilterName,
  getState: TGetState,
  setState: TSetState,
): void => {
  setState({ ...getState(), filterName });
};

// A labeled, clickable button whose own on/off state is part of what's
// rendered (an icon that fills or empties) -- generic across whatever
// it happens to toggle. Named after the interaction (a stateful button),
// not after favoriting: renaming toggleFavorite wouldn't force a rename
// here, which is the whole test (this README's own "essential contract"
// section). Reused wherever a toggle button like this is needed, not
// just for favoriting -- the type doesn't know favoriting exists.
export type TToggleButtonProps = {
  label: string;
  isOn: boolean;
  onClick: () => void;
};

// A plain button -- no icon, no state of its own beyond its label, which
// already says what it currently does ("Follow"/"Unfollow"). Reused for
// following, and for anything else that's just a labeled click.
export type TButtonProps = {
  label: string;
  onClick: () => void;
};

export type TFavoriteFollowProps = {
  toggleButtonProps: TToggleButtonProps;
  buttonProps: TButtonProps;
};

// Shared by the feed preview and the article detail (article-view-model.ts)
// -- favoriting/following an article looks and behaves identically in both
// places, so this is compiled once rather than duplicated per view. This
// function is the one place allowed to know that the toggle button means
// favoriting and the plain button means following (README's "essential
// contract" section) -- everything downstream of it, including the type
// it returns, only ever sees a toggle button and a plain button.
export function compileFavoriteFollowProps(
  article: TArticle,
  state: TState,
  getState: TGetState,
  setState: TSetState,
): TFavoriteFollowProps {
  const isFavorite = isFavoritedBy(article, state.name);
  return {
    toggleButtonProps: {
      label: `${isFavorite ? "Unfavorite" : "Favorite"} (${article.favoritedBy.length})`,
      isOn: isFavorite,
      onClick: () => onToggleFavorite(article.title, getState, setState),
    },
    buttonProps: {
      label: isFollowing(state, article.authorName) ? "Unfollow" : "Follow",
      onClick: () => onToggleFollow(article.authorName, getState, setState),
    },
  };
}

export type TArticlePreviewProps = TFavoriteFollowProps & {
  title: string;
  summary: string;
  authorName: string;
  // "" when the author never set one through Settings -- same contract as
  // selectAvatarUrl itself, not a broken-image placeholder.
  avatarUrl: string;
  createdAt: string;
  tags: string[];
  onOpenClick: () => void;
  onTagClick: (tag: string) => void;
  onAuthorClick: () => void;
};

export type TFeedViewModel = {
  articlePreviewProps: TArticlePreviewProps[];
  // Exactly two, in render order (Global Feed, Your Feed) -- the
  // component renders them as tabs and doesn't know essence has a
  // TFilterName at all; compileFeedViewModel below is the one place
  // that knows which button means which lens.
  lensButtonProps: TToggleButtonProps[];
  // null -- no tag filter active -- not a separate isFiltered flag, same
  // presence-not-flag rule as everywhere else in this codebase.
  activeTag: string | null;
  onClearTagClick: () => void;
};

// Exported -- reused by profile-view-model.ts, whose own list of article
// previews (one author's, not the feed's) is compiled exactly the same
// way.
export function compileArticlePreviewProps(
  article: TArticle,
  state: TState,
  getState: TGetState,
  setState: TSetState,
  onOpenArticle: (title: string) => void,
  onOpenProfile: (authorName: string) => void,
): TArticlePreviewProps {
  return {
    title: article.title,
    summary: article.summary,
    authorName: article.authorName,
    avatarUrl: selectAvatarUrl(state, article.authorName),
    createdAt: article.createdAt,
    tags: article.tags,
    onOpenClick: () => onOpenArticle(article.title),
    onTagClick: (tag: string) => onSetTag(tag, getState, setState),
    onAuthorClick: () => onOpenProfile(article.authorName),
    ...compileFavoriteFollowProps(article, state, getState, setState),
  };
}

// No state-derived props to compile -- there's nothing to look up, only
// values the composition root already has when it's editing an existing
// article (and none when it's a blank form). No separate "submission" or
// "draft" type: reuse essence's own TDraftArticle, minus createdAt (that's
// IO, added by the composition root, not the click).
export type TEditorProps = {
  title?: string;
  summary?: string;
  body?: string;
  tags?: string[];
  onClick: (draft: Omit<TDraftArticle, "createdAt">) => void;
};

// Every essence lens gets its own toggle button, computed the same way:
// on when it's the current lens, clicking it sets it as the current lens.
// The array's own order is what the component treats as render order --
// nothing about "global" or "personal" survives past this function.
function compileLensButtonProps(
  filterName: TFilterName,
  label: string,
  state: TState,
  getState: TGetState,
  setState: TSetState,
): TToggleButtonProps {
  return {
    label,
    isOn: state.filterName === filterName,
    onClick: () => onSetFilter(filterName, getState, setState),
  };
}

export function compileFeedViewModel(
  state: TState,
  getState: TGetState,
  setState: TSetState,
  onOpenArticle: (title: string) => void,
  onOpenProfile: (authorName: string) => void,
): TFeedViewModel {
  return {
    articlePreviewProps: selectVisibleArticles(state).map((article) =>
      compileArticlePreviewProps(article, state, getState, setState, onOpenArticle, onOpenProfile),
    ),
    lensButtonProps: [
      compileLensButtonProps("global", "Global Feed", state, getState, setState),
      compileLensButtonProps("personal", "Your Feed", state, getState, setState),
    ],
    activeTag: state.activeTag,
    onClearTagClick: () => onClearTag(getState, setState),
  };
}

export type TTagProps = {
  label: string;
  onClick: () => void;
  isActive: boolean;
};

// A discovery shortcut, not the filter itself -- deliberately computed
// over every article (state.articles), not just the currently visible
// ones, so it stays useful for finding your way *out* of a filter too.
export function compilePopularTagsViewModel(
  state: TState,
  getState: TGetState,
  setState: TSetState,
): TTagProps[] {
  return selectPopularTags(state.articles).map((tag) => ({
    label: tag,
    onClick: () => onSetTag(tag, getState, setState),
    isActive: state.activeTag === tag,
  }));
}
