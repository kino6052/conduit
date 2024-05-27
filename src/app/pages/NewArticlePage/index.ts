import { IArticleService } from "../../services/ArticleService/types";
import { INavigationService } from "../../services/NavigationService/types";
import { EditArticlePage } from "../EditArticlePage";
import { EPage, IPage } from "../types";

export class NewArticlePage extends EditArticlePage implements IPage {
  public pageType: EPage = EPage.NewArticle;

  constructor(
    articleId: string,
    articleService: IArticleService,
    navigationService: INavigationService,
  ) {
    super(articleId, articleService, navigationService);
  }
}
