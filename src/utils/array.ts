export function findFirst<T>(arr: T[]) {
  return arr.find(Boolean) as Exclude<T, boolean> | undefined;
}

export function filterBoolean<T>(arr: (T | false)[]): T[] {
  return arr.filter(Boolean) as T[];
}
