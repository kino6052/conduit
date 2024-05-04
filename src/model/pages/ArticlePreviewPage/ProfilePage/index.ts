import { ArticlePreviewPage } from "..";
import { IArticleDAO } from "../../../data/ArticleDAO/types";
import { IAppState } from "../../../types";
import { EPage, IPage } from "../../types";

export class ProfilePage extends ArticlePreviewPage implements IPage {
  public pageType: EPage = EPage.Profile;

  constructor(state: IAppState, articlesSource: IArticleDAO) {
    super(state, articlesSource);
  }
}
