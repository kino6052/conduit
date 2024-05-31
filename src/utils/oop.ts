export function createProxy<T extends object>(targets: Partial<T>[]): T {
  return new Proxy({} as T, {
    get(_, prop) {
      for (const target of targets) {
        if (prop in target) {
          // @ts-ignore
          return target[prop].bind(target);
        }
      }
    },
  });
}
