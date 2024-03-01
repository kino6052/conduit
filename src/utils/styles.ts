export function getClassNames<T extends any[]>(names: T, styles: Record<string, string>) {
  return names
    .map(name => styles[name] ?? name)
    .filter(Boolean)
    .join(" ");
}