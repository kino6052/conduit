// An accident, not essence -- see docs/realworld-essence-checklist.md
// Part 2 ("The exact 'more than fits on screen' mechanism"). Nothing in
// src/essence knows this exists; it operates on whatever list it's given
// (e.g. selectVisibleArticles's output), entirely from the outside.
//
// Interface Segregation (docs/solid-in-this-repo.md#interface-segregation):
// takes T[], not TArticle[] or TState. It doesn't know Conduit exists --
// the narrowest contract the behavior actually needs, not the shape of our
// domain.

export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
