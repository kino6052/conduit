import { IArticle } from "../../components/Article/types";
import { getNavigationTabs } from "../../components/Navigation";
import { ExclusiveSelector } from "../../components/Selector/ExclusiveSelector";
import { ISelector } from "../../components/Selector/types";
import { ITab } from "../../components/Tab/types";
import { IArticleService } from "../../services/ArticleService/types";
import { INavigationService } from "../../services/NavigationService/types";

export class ArticlePreviewPage {
  public isLoading: boolean = false;
  public tags: ISelector;
  public navigationTabs: ITab[] = [];
  public pagination: ISelector;
  public articles: IArticle[] = [];
  public tabs: ISelector;

  protected constructor(
    protected articleService: IArticleService,
    protected navigationService: INavigationService,
    protected username?: string,
  ) {
    if (!articleService) throw new Error("No article service provided");

    this.navigationTabs = getNavigationTabs(navigationService);
  }

  static async create(
    articleService: IArticleService,
    navigationService: INavigationService,
  ) {
    const page = new ArticlePreviewPage(articleService, navigationService);

    page.isLoading = true;
    await page.initialize();
    page.isLoading = false;

    return page;
  }

  private async onTagSelected(tag: string) {
    this.isLoading = true;
    const { articles, pagination } =
      await this.articleService.getDataForPagination(
        undefined,
        tag,
        this.username,
      );
    this.articles = articles;
    this.pagination = new ExclusiveSelector(
      pagination,
      this.onPageChanged.bind(this),
    );
    this.isLoading = false;
  }

  private async onPageChanged(pageIndex: number) {
    this.isLoading = true;
    const { articles, pagination } =
      await this.articleService.getDataForPagination(
        pageIndex,
        undefined,
        this.username,
      );
    this.articles = articles;
    this.pagination = new ExclusiveSelector(
      pagination,
      this.onPageChanged.bind(this),
    );
    this.isLoading = false;
  }

  private onTabSelected(tabId: string) {
    // Handle tab selection logic if necessary
    console.log(`Tab ${tabId} selected`);
  }

  protected async initialize() {
    const { articles, pagination, tags, tabs } =
      await this.articleService.getDataForPagination();

    this.articles = articles;
    this.tags = new ExclusiveSelector(tags, this.onTagSelected.bind(this));
    this.pagination = new ExclusiveSelector(
      pagination,
      this.onPageChanged.bind(this),
    );
    this.tabs = new ExclusiveSelector(tabs, this.onTabSelected.bind(this));
  }
}
