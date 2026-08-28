// Not "session"/"auth"/"store" -- none of those are entities on screen
// (docs/ontological-entities-in-this-repo.md rejects "User" the same way).
// What's perceivable is a name, or the absence of one -- a "guest" isn't
// its own entity either, it's just what's on screen when there's no
// signed-in name (docs/ontological-entities-in-this-repo.md: "if something
// doesn't have a perceivable correlate, it can't be an entity"). No
// separate signedIn boolean alongside it: presence of the name already
// tells you that, same "no isOwnArticle-style flag" rule used everywhere
// else in this repo. Same "Step 4" shape as TNavigation/TConfirm: the
// contract first, grounded in what's perceivable, before any concrete
// implementation exists.
export type TSignIn = {
  signedInName: () => string | undefined;
  // (name, password) is the whole credential scheme this contract
  // requires -- what a concrete implementation actually does with them
  // is its own business. This one doesn't check the password against
  // anything: there's no account record to check it against (that's
  // still open, docs/realworld-essence-checklist.md, "the specific
  // credential scheme"). It only tracks the one fact the rest of the
  // app needs: whose name, if anyone's, is currently signed in.
  signIn: (name: string, password: string) => void;
  signOut: () => void;
};

// Holds the necessary state itself, in memory -- not delegated to any
// persistence technology. That's a separate, still-open question
// (docs/realworld-essence-checklist.md, "how identity persists between
// visits"). Good enough to test the contract itself, and, for now, the
// only implementation this app has -- same starting point as
// createMemoryNavigation before createHashNavigation existed.
export function createSignIn(): TSignIn {
  let name: string | undefined;

  return {
    signedInName: () => name,
    signIn: (signedInName) => {
      name = signedInName;
    },
    signOut: () => {
      name = undefined;
    },
  };
}
