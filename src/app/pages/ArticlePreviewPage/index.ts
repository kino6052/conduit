import { filterBoolean, findFirst } from "../../../utils/array";
import { IArticle } from "../../components/Article/types";
import { getNavigationTabs } from "../../components/Navigation";
import { ExclusiveSelector } from "../../components/Selector/ExclusiveSelector";
import { ISelector } from "../../components/Selector/types";
import { TTab } from "../../components/Tab/types";
import { IArticleService } from "../../services/ArticleService/types";
import { INavigationService } from "../../services/NavigationService/types";
import { ETab } from "./constants";

export class ArticlePreviewPage {
  public isLoading: boolean = true;
  public tags: ISelector<{ id: string }> | undefined;
  public navigationTabs: ExclusiveSelector<TTab>;
  public pagination: ISelector<{}> | undefined;
  public articles: IArticle[] = [];
  public tabs: ISelector<Partial<TTab>> | undefined;

  protected constructor(
    protected articleService: IArticleService,
    protected navigationService: INavigationService,
  ) {
    if (!articleService) throw new Error("No article service provided");
    if (!navigationService) throw new Error("No navigation service provided");

    this.navigationTabs = getNavigationTabs(navigationService);
  }

  protected async initialize(settings: {
    username?: string;
    skipTabs?: boolean;
    skipPagination?: boolean;
    skipTags?: boolean;
  }) {
    this.isLoading = true;

    try {
      const currentTab = this.tabs?.getSelectedItem();
      const currentTag = this.tags?.getSelectedItem();
      const currentPaginationNumber = this.pagination?.getSelectedIndex() ?? 0;
      const username =
        currentTab?.id === ETab.YourFeed ? settings.username : undefined;
      const currentTabId =
        findFirst([currentTag && ETab.Tag, currentTab?.id]) ?? ETab.GlobalFeed;

      const { articles, numberOfPages, tags } =
        await this.articleService.getDataForPagination(
          currentPaginationNumber,
          currentTag?.id,
          username,
        );

      if (!settings.skipTabs) {
        this.updateTabs(currentTabId, currentTag);
      }

      this.articles = articles;

      if (!settings.skipTags) {
        this.updateTags(tags);
      }

      if (!settings.skipPagination) {
        this.updatePagination(numberOfPages, username);
      }
    } catch (error) {
      console.error("Failed to initialize article preview page:", error);
    } finally {
      this.isLoading = false;
    }
  }

  private updateTabs(
    currentTabId: string,
    currentTag: { id: string } | undefined,
    username?: string,
  ) {
    const tabs = filterBoolean([
      { id: ETab.GlobalFeed, text: "Global Feed" },
      !!username && {
        id: ETab.YourFeed,
        text: "Your Feed",
      },
      !!currentTag && { id: ETab.Tag, text: currentTag.id },
    ]);

    this.tabs = new ExclusiveSelector<Partial<TTab>>(
      tabs,
      async ({ id }) => {
        if (id === ETab.Tag) return;
        this.tags?.unselectAll();
        await this.initialize({ username, skipTags: true });
      },
      tabs.findIndex((item) => item.id === currentTabId),
    );
  }

  private updateTags(tags: string[]) {
    this.tags = new ExclusiveSelector(
      tags.map((t) => ({ id: t, name: t })),
      async () => {
        await this.initialize({ skipTags: true });
      },
    );
  }

  private updatePagination(numberOfPages: number, username?: string) {
    this.pagination = new ExclusiveSelector(
      new Array(numberOfPages).fill({}),
      async () => {
        await this.initialize({
          username,
          skipPagination: true,
          skipTabs: true,
          skipTags: true,
        });
      },
      0,
    );
  }
}
