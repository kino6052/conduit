import { Control } from "..";
import { IArticleService } from "../../../services/ArticleService/types";

export class AuthorControl extends Control {
  constructor(
    username: string,
    private articleService: IArticleService,
  ) {
    super(username, async () => {
      this.isDisabled = true;
      this.articleService.examineAuthor(username);
      this.isDisabled = false;
    });
  }
}
