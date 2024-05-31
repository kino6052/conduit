import {
  IArticleCRUD,
  IArticleComments,
} from "../../../app/interfaces/data/ArticleDAO/types";

export class ArticleComments implements IArticleComments {
  constructor(private articleCRUD: IArticleCRUD) {}

  public async addCommentById(id: string, comment: string, username: string) {
    const article = await this.articleCRUD.getArticleById(id);
    if (!article) return;
    const newComment = { id: String(Math.random()), text: comment, username }; // Simple ID generation for example
    await this.articleCRUD.updateArticleById(id, {
      comments: [newComment, ...article.comments],
    });
    return this.articleCRUD.getArticleById(id);
  }
}
