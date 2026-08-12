// Which page you're on isn't essence -- it's navigation, an accident
// (src/accidents/navigation), so this doesn't touch TState/TGetState/
// TSetState at all, only the one navigation fact a header cares about:
// whether an article is currently open. Kept separate from view-model.ts
// for the same reason article-view-model.ts is its own file -- one
// derived composite (docs/solid-in-this-repo.md), the header, not mixed
// into the feed's.

export type THeaderProps = {
  // "Home" isn't essence either -- it's the one nav destination this repo
  // currently has, since Editor/NameForm render inline rather than behind
  // their own routes (docs/realworld-essence-checklist.md, "Pages"). No
  // isOwnArticle-style stored flag here: recomputed from the same fact
  // (openArticleTitle) every time, same discipline as isMine.
  isHome: boolean;
  onHomeClick: () => void;
};

export function compileHeaderViewModel(
  openArticleTitle: string | null,
  onGoHome: () => void,
): THeaderProps {
  return {
    isHome: openArticleTitle === null,
    onHomeClick: onGoHome,
  };
}
