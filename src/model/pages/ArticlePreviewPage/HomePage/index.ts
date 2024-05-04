import { ArticlePreviewPage } from "..";
import { IArticleDAO } from "../../../data/ArticleDAO/types";
import { IAppState } from "../../../types";
import { EPage, IPage } from "../../types";

export class HomePage extends ArticlePreviewPage implements IPage {
  public pageType: EPage = EPage.Home;

  constructor(state: IAppState, articlesSource: IArticleDAO) {
    super(state, articlesSource);
  }
}