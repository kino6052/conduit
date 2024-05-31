import {
  IArticleCRUD,
  IArticleLikes,
} from "../../../app/interfaces/data/ArticleDAO/types";

export class ArticleLikes implements IArticleLikes {
  constructor(private articleCRUD: IArticleCRUD) {}

  public async getLikers(id: string) {
    const article = await this.articleCRUD.getArticleById(id);
    return article?.likers || [];
  }

  public async updateLikers(id: string, likers: string[]) {
    await this.articleCRUD.updateArticleById(id, { likers });
  }

  public async likeArticleById(id: string, username: string) {
    const article = await this.articleCRUD.getArticleById(id);
    if (!article) return;
    const likers = article.likers.includes(username)
      ? article.likers.filter((user) => user !== username)
      : [...article.likers, username];
    await this.updateLikers(id, likers);
  }
}
