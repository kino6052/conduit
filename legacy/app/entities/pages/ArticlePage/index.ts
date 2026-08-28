import { IArticleService } from "../../../interfaces/services/ArticleService/types";
import { INavigationService } from "../../../interfaces/services/NavigationService/types";
import { IUserService } from "../../../interfaces/services/UserService/types";
import { IArticle } from "../../components/Article/types";
import { Control } from "../../components/Control";
import { IControl } from "../../components/Control/types";
import { Field } from "../../components/Field";
import { getNavigationTabs } from "../../components/Navigation";
import { ExclusiveSelector } from "../../components/Selector/ExclusiveSelector";
import { TTab } from "../../components/Tab/types";
import { IUser } from "../../components/User/types";
import { FollowControl } from "../../components/FollowControl";
import { EPage, IPage } from "../types";

export class ArticlePage implements IPage {
  public pageType: EPage = EPage.Article;
  public article: IArticle | undefined;

  public navigationTabs: ExclusiveSelector<TTab>;

  public comment = new Field<string>("");

  public followControl: IControl | undefined;
  public editControl: IControl | undefined;
  public deleteControl: IControl | undefined;
  public submitCommentControl: IControl | undefined;

  protected constructor(
    protected articleService: IArticleService,
    protected navigationService: INavigationService,
    protected userService: IUserService,
  ) {
    if (!articleService) throw new Error("No article service provided");
    if (!navigationService) throw new Error("No navigation service provided");

    this.navigationTabs = getNavigationTabs(navigationService);
  }

  static async create(
    articleId: string,
    articleService: IArticleService,
    navigationService: INavigationService,
    userService: IUserService,
  ) {
    const page = new ArticlePage(
      articleService,
      navigationService,
      userService,
    );

    await page.initialize(articleId);

    return page;
  }

  public async initialize(articleId: string): Promise<void> {
    this.article = await this.articleService.prepareArticle(articleId);
    const username = this.article?.articleData.username;
    const user: IUser | undefined =
      username && (await this.userService.getUserProfile(username));

    if (username === this.userService.currentUser) {
      this.editControl = new Control("Change", async () => {
        const id = this.article?.articleData.id;
        if (!id) return;
        await this.navigationService.navigateToArticle(id, true);
      });

      this.deleteControl = new Control("Delete", async () => {
        const id = this.article?.articleData.id;
        if (!id) return;
        await this.articleService.delete(id);
      });
    }

    this.submitCommentControl = new Control("Submit", async () => {
      const id = this.article?.articleData.id;
      if (!id) return;
      await this.articleService.submitComment(this.comment.value, id);
      this.article = await this.articleService.prepareArticle(articleId);
    });

    this.followControl = user && new FollowControl(user);

    this.submitCommentControl.isDisabled = true;
    this.comment = new Field<string>("", async () => {
      if (!this.submitCommentControl) return;
      this.submitCommentControl.isDisabled = !this.comment.value;
    });
  }
}
