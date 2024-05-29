import { ArticlePreviewPage } from "..";
import { IArticleService } from "../../../../interfaces/services/ArticleService/types";
import { INavigationService } from "../../../../interfaces/services/NavigationService/types";
import { EPage, IPage } from "../../types";

export class HomePage extends ArticlePreviewPage implements IPage {
  public pageType: EPage = EPage.Home;

  private constructor(
    articleService: IArticleService,
    navigationService: INavigationService,
  ) {
    super(articleService, navigationService);
  }

  static async create(
    articleService: IArticleService,
    navigationService: INavigationService,
  ) {
    const page = new HomePage(articleService, navigationService);

    await page.initialize({});

    return page;
  }
}
