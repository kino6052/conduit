import { EditArticlePage } from "../EditArticlePage";
import { EPage, IPage } from "../types";

export class NewArticlePage extends EditArticlePage implements IPage {
  public pageType: EPage = EPage.NewArticle;
}
