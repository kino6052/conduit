// A discovery shortcut on top of tag filtering, not the filtering
// capability itself (docs/realworld-essence-checklist.md, Part 2) --
// accident, not essence. Interface Segregation
// (docs/solid-in-this-repo.md): takes the one field it needs, `tags`, not
// a whole TArticle.

export function selectPopularTags(articles: { tags: string[] }[], limit = 5): string[] {
  const counts = new Map<string, number>();

  for (const article of articles) {
    for (const tag of article.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}
