// Not "storage" as a concept baked into any one accident -- a generic
// contract, same ISP discipline as state-management.ts's TStateManagement<T>:
// this file doesn't know what T is, so it can back a signed-in name today
// without becoming "the persistence layer for everything" tomorrow just
// because it happens to be generic.
export type TPersistence<T> = {
  load: () => T | undefined;
  save: (value: T) => void;
  clear: () => void;
};

// The simplest implementation: a plain closure, nothing behind it.
// Good enough to test the contract itself, and to let anything built on
// top of TPersistence (src/accidents/sign-in/sign-in.ts's
// createPersistentSignIn) be tested without a real browser -- same
// starting point as createMemoryNavigation/createMemoryState before this
// file existed. The real implementation (localStorage) lives in its own
// sibling file, persistence-local-storage.ts -- same split as
// navigation.ts/navigation-hash.ts, so this file's own branches (there
// are none yet, but there could be) stay covered instead of the whole
// file needing a coverage exclude just because one function in it can't
// be unit-tested.
export function createMemoryPersistence<T>(): TPersistence<T> {
  let value: T | undefined;

  return {
    load: () => value,
    save: (next) => {
      value = next;
    },
    clear: () => {
      value = undefined;
    },
  };
}
