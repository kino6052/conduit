// The real implementation of TPersistence (persistence.ts): window.localStorage.
// Not unit-tested -- a browser global, same category as navigation-hash.ts
// (README, "The essential contract"). JSON-encoded so any T can be
// stored, not just strings.

import { TPersistence } from "./persistence";

export function createLocalStoragePersistence<T>(key: string): TPersistence<T> {
  return {
    load: () => {
      const raw = localStorage.getItem(key);
      return raw === null ? undefined : (JSON.parse(raw) as T);
    },
    save: (value) => {
      localStorage.setItem(key, JSON.stringify(value));
    },
    clear: () => {
      localStorage.removeItem(key);
    },
  };
}
