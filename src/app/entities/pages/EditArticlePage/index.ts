import { IArticleService } from "../../../interfaces/services/ArticleService/types";
import { INavigationService } from "../../../interfaces/services/NavigationService/types";
import { Control } from "../../components/Control";
import { IControl } from "../../components/Control/types";
import { Field } from "../../components/Field";
import { getNavigationTabs } from "../../components/Navigation";
import { ExclusiveSelector } from "../../components/Selector/ExclusiveSelector";
import { TTab } from "../../components/Tab/types";
import { EPage, IPage } from "../types";

export class EditArticlePage implements IPage {
  public pageType: EPage = EPage.EditArticle;
  public title = new Field<string>("");
  public article = new Field<string>("");
  public tags = new Field<string>("");
  public navigationTabs: ExclusiveSelector<TTab>;
  public submitControl: IControl | undefined;

  protected constructor(
    public articleId: string,
    private articleService: IArticleService,
    private navigationService: INavigationService,
  ) {
    this.navigationTabs = getNavigationTabs(this.navigationService);
  }

  public static async create(
    articleId: string,
    articleService: IArticleService,
    navigationService: INavigationService,
  ) {
    const article =
      !!articleId && (await articleService.prepareArticle(articleId));

    const page = new EditArticlePage(
      articleId,
      articleService,
      navigationService,
    );

    page.submitControl = new Control("Submit", async () => {
      await articleService.publish(
        articleId,
        page.title.value,
        page.article.value,
        page.generateTags(),
      );
    });

    if (article && article?.articleData) {
      page.title.value = article.articleData.title;
      page.article.value = article.articleData.description;
      page.tags.value = article.articleData.tags.join(" ");
    }

    return page;
  }

  public generateTags() {
    const tags = new Set(this.tags.value.split(" "));
    return Array.from(tags).filter(Boolean);
  }
}
