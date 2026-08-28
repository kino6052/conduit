import { BehaviorSubject, skip } from "rxjs";

// Not "store" -- same rejection as everywhere else in this repo
// (docs/ontological-entities-in-this-repo.md's test applied to
// implementation vocabulary, README's "essential contract" section).
// What this holds is a value and a way to be told when it changes -- the
// composition root's own name for "the essence's current state, held
// somewhere, broadcast to whoever's listening." Generic over T rather than
// hard-coded to essence's TState, so this file doesn't need to know
// anything about articles or comments -- same ISP discipline as isMine's
// {authorName} slice.
export type TStateManagement<T> = {
  getState: () => T;
  setState: (next: T) => void;
  subscribe: (listener: (state: T) => void) => () => void;
};

// The simplest implementation: a plain closure and a Set of listeners, no
// library underneath it at all. Good enough to test the contract itself,
// and -- unlike navigation/sign-in -- also good enough for the real app:
// there was never a reason this needed RxJS specifically, only something
// that broadcasts changes; createRxState (same file) exists to keep using
// the library this project already depends on (rxjs), not because plain
// closures can't do the job.
export function createMemoryState<T>(initial: T): TStateManagement<T> {
  let state = initial;
  const listeners = new Set<(state: T) => void>();

  return {
    getState: () => state,
    setState: (next) => {
      state = next;
      for (const listener of listeners) listener(state);
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

// The real app's implementation: an RxJS BehaviorSubject underneath, kept
// for the same reason navigation kept a browser-backed implementation
// alongside its memory one -- exercising the library this project already
// depends on. skip(1) so a subscriber only hears changes from here on,
// same "getState() already gives you the current value" reasoning as
// src/index.ts had before this file existed.
export function createRxState<T>(initial: T): TStateManagement<T> {
  const state$ = new BehaviorSubject<T>(initial);

  return {
    getState: () => state$.getValue(),
    setState: (next) => state$.next(next),
    subscribe: (listener) => {
      const subscription = state$.pipe(skip(1)).subscribe(listener);
      return () => subscription.unsubscribe();
    },
  };
}
