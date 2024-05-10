import { changePage, getNavigationTabs } from "../../components/Navigation";
import { ITab } from "../../components/Tab/types";
import { IArticleDAO } from "../../data/ArticleDAO/types";
import { IUserDAO } from "../../data/UserDAO/types";
import { IAppState } from "../../types";
import { HomePage } from "../ArticlePreviewPage/HomePage";
import { EPage, IPage } from "../types";

export class EditArticlePage implements IPage {
  public pageType: EPage = EPage.EditArticle;
  public title: string = "";
  public article: string = "";
  public tags: string = "";
  public navigationTabs: ITab[] = [];

  constructor(
    public state: IAppState,
    private articleDao: IArticleDAO,
    private userDao: IUserDAO,
  ) {
    this.navigationTabs = getNavigationTabs(
      this.state,
      this.articleDao,
      this.userDao,
    );
  }

  public async initialize(): Promise<void> {
    return;
  }

  public async publishArticle() {
    await this.articleDao.publishArticle({
      description: this.article,
      tags: this.generateTags(),
      title: this.title,
      username: this.state.currentUsername,
    });

    await changePage(
      new HomePage(this.state, this.articleDao, this.userDao),
      this.state,
    );
  }

  public generateTags() {
    const tags = new Set(this.tags.split(" "));
    return Array.from(tags).filter(Boolean);
  }
}
