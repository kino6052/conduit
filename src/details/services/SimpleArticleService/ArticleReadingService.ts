import { IArticleReadingService } from "../../../app/interfaces/services/ArticleService/types";
import { INavigationService } from "../../../app/interfaces/services/NavigationService/types";

export class ArticleReadingService implements IArticleReadingService {
  constructor(private navigationService: INavigationService) {}

  public async readArticle(articleId: string): Promise<void> {
    await this.navigationService.navigateToArticle(articleId);
  }
}
