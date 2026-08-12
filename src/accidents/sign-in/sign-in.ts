// Not "session"/"auth"/"store" -- none of those are entities on screen
// (docs/ontological-entities-in-this-repo.md rejects "User" the same way).
// What's perceivable is a fact -- are you currently signed in -- and two
// ways to change it. Same "Step 4" shape as TNavigation/TConfirm: the
// contract first, grounded in what's perceivable, before any concrete
// implementation exists.
export type TSignIn = {
  signedIn: () => boolean;
  // (name, password) is the whole credential scheme this contract
  // requires -- what a concrete implementation actually does with them
  // is its own business. This one doesn't check the password against
  // anything: there's no account record to check it against (that's
  // still open, docs/realworld-essence-checklist.md, "the specific
  // credential scheme"). It only tracks the one fact the rest of the
  // app needs: are we currently signed in.
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
  let isSignedIn = false;

  return {
    signedIn: () => isSignedIn,
    signIn: () => {
      isSignedIn = true;
    },
    signOut: () => {
      isSignedIn = false;
    },
  };
}
