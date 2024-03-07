export function findFirst<T>(arr: T[]) {
  return arr.find(Boolean) as Exclude<T, boolean> | undefined;
}
