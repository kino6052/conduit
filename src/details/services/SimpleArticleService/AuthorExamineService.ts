import { IAuthorExaminationService } from "../../../app/interfaces/services/ArticleService/types";
import { INavigationService } from "../../../app/interfaces/services/NavigationService/types";

export class AuthorExaminationService implements IAuthorExaminationService {
  constructor(private navigationService: INavigationService) {}

  public async examineAuthor(username: string): Promise<void> {
    await this.navigationService.navigateToUserProfile(username);
  }
}
