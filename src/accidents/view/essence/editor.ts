import { TArticle } from "../../../essence/state";

// Same form for writing and editing -- an article being edited is just
// the same fields, pre-filled (docs/ontological-entities-in-this-repo.md:
// "its fields... are plain text inputs, not a 'draft' entity"). Which
// action the form submits under (publish-article vs. save-article) is how
// the composition root (src/index.essence.ts) tells the two apart -- an
// originalTitle field carries which article is being replaced, since
// title is how articles are identified everywhere else too (no synthetic
// id, same as selectArticle/editArticle/deleteArticle).
export function renderEditor(article?: TArticle): string {
  const action = article ? "save-article" : "publish-article";
  const originalTitleField = article
    ? `<input type="hidden" name="originalTitle" value="${article.title}" />`
    : "";

  return `<form data-action="${action}">
  ${originalTitleField}
  <input name="title" placeholder="Article Title" value="${article?.title ?? ""}" />
  <input name="summary" placeholder="What's this article about?" value="${article?.summary ?? ""}" />
  <textarea name="body" placeholder="Write your article (in markdown)">${article?.body ?? ""}</textarea>
  <input name="tags" placeholder="Enter tags" value="${article?.tags.join(", ") ?? ""}" />
  <button type="button">${article ? "Save Changes" : "Publish Article"}</button>
</form>`;
}
