import { Control } from "..";
import { IArticleService } from "../../../../interfaces/services/ArticleService/types";

export class AuthorControl extends Control {
  constructor(
    username: string,
    private articleService: IArticleService,
  ) {
    super(username, async () => {
      this.isDisabled = true;
      await this.articleService.examineAuthor(username);
      this.isDisabled = false;
    });
  }
}
