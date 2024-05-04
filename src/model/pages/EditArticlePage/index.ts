import { changePage } from "../../components/Navigation";
import { IArticleDAO } from "../../data/ArticleDAO/types";
import { IAppState } from "../../types";
import { HomePage } from "../ArticlePreviewPage/HomePage";
import { EPage, IPage } from "../types";

export class EditArticlePage implements IPage {
  public pageType: EPage = EPage.EditArticle;
  public title: string = "";
  public article: string = "";
  public tags: string = "";

  constructor(
    public state: IAppState,
    private articlesSource: IArticleDAO,
  ) {}

  public async initialize(): Promise<void> {
    return;
  }

  public async publishArticle() {
    await this.articlesSource.publishArticle({
      description: this.article,
      tags: this.generateTags(),
      title: this.title,
      username: this.state.currentUsername,
    });

    await changePage(new HomePage(this.state, this.articlesSource), this.state);
  }

  public generateTags() {
    const tags = new Set(this.tags.split(" "));
    return Array.from(tags);
  }
}
