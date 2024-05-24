import { Control } from "..";
import { IArticleService } from "../../../services/ArticleService/types";

export class LikeControl extends Control {
  constructor(
    text: string,
    articleId: string,
    private articleService: IArticleService,
  ) {
    super(text, async () => this.toggleLike(articleId));
  }

  private async toggleLike(articleId: string) {
    this.isDisabled = true;
    await this.articleService.likeArticleById(articleId);
    this.isDisabled = false;
  }
}
