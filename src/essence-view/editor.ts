export function renderEditor(): string {
  return `<form data-action="publish-article">
  <input name="title" placeholder="Article Title" />
  <input name="summary" placeholder="What's this article about?" />
  <textarea name="body" placeholder="Write your article (in markdown)"></textarea>
  <input name="tags" placeholder="Enter tags" />
  <button type="button">Publish Article</button>
</form>`;
}
