import { IArticleDAO } from "../../data/ArticleDAO/types";
import { IUserDAO } from "../../data/UserDAO/types";
import { IAppState } from "../../types";
import { EditArticlePage } from "../EditArticlePage";
import { EPage, IPage } from "../types";

export class NewArticlePage extends EditArticlePage implements IPage {
  public pageType: EPage = EPage.NewArticle;

  constructor(state: IAppState, articleDao: IArticleDAO, userDao: IUserDAO) {
    super(state, articleDao, userDao);
  }
}
