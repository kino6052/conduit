import { Control } from "..";
import { IAuthorExaminationService } from "../../../../interfaces/services/ArticleService/types";

export class AuthorControl extends Control {
  constructor(
    username: string,
    private authorExaminationService: IAuthorExaminationService,
  ) {
    super(username, async () => {
      this.isDisabled = true;
      await this.authorExaminationService.examineAuthor(username);
      this.isDisabled = false;
    });
  }
}
