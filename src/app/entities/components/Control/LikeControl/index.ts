import { Control } from "..";
import { IArticleService } from "../../../../interfaces/services/ArticleService/types";

export class LikeControl extends Control {
  constructor(
    public likes: number,
    articleId: string,
    private articleService: IArticleService,
  ) {
    super("", async () => this.toggleLike(articleId));
    this.text = this.getText();
  }

  private getText() {
    return `${this.likes}`;
  }

  private async toggleLike(articleId: string) {
    this.isDisabled = true;
    this.likes = await this.articleService.likeArticleById(articleId);
    this.text = this.getText();
    this.isDisabled = false;
  }
}
