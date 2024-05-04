import { ArticlePreviewPage } from "..";
import { IArticleSource } from "../../../data/ArticleSource/types";
import { IAppState } from "../../../types";
import { EPage } from "../../types";

export class HomePage extends ArticlePreviewPage {
  public pageType: EPage = EPage.Home;

  constructor(state: IAppState, articlesSource: IArticleSource) {
    super(state, articlesSource);
  }
}
