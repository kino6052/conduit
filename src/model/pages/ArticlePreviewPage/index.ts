import { Article } from "../../components/Article";
import { IArticle } from "../../components/Article/types";
import { getNavigationTabs } from "../../components/Navigation";
import { Pagination } from "../../components/Pagination";
import { ContentTab } from "../../components/Tab";
import { ITab } from "../../components/Tab/types";
import { IArticleDAO, IArticleData } from "../../data/ArticleDAO/types";
import { IUserDAO } from "../../data/UserDAO/types";
import { IAppState } from "../../types";
import { ETab } from "./constants";

/**
 * This class is needed because there are multiple pages that can preview articles
 */
export class ArticlePreviewPage {
  public tags: string[] = [];
  public navigationTabs: ITab[] = [];
  public pagination: Pagination | undefined;
  public articles: IArticle[] = [];
  public tabs: ITab[] = [];

  constructor(
    public state: IAppState,
    protected articleDao: IArticleDAO,
    protected userDao: IUserDAO,
  ) {
    if (!state) throw new Error("No state provided");
    if (!articleDao) throw new Error("No article source provided");
    if (!userDao) throw new Error("No user source provided");

    this.navigationTabs = getNavigationTabs(
      this.state,
      this.articleDao,
      this.userDao,
    );
  }

  private async initializeTabs() {
    this.tabs = [
      new ContentTab(
        "Global Feed",
        ETab.GlobalFeed,
        async () => {
          this.state.isLoading = true; // TODO: Think about how to process loading;
          await this.initialize();
          this.selectTab(ETab.GlobalFeed);
          this.state.isLoading = false;
        },
        true,
      ),

      this.state.currentUsername &&
        new ContentTab("Your Feed", ETab.YourFeed, async () => {
          this.state.isLoading = true;
          await this.initialize(
            undefined,
            undefined,
            this.state.currentUsername,
          );
          this.selectTab(ETab.YourFeed);
          this.state.isLoading = false;
        }),
    ].filter(Boolean) as ITab[];
  }

  private selectTab(id: ETab) {
    this.tabs = this.tabs
      .filter((tab) => tab.id !== ETab.Tag)
      .map((tab) => {
        tab.isSelected = tab.id === id;
        return tab;
      });
  }

  private processArticles(articleData: IArticleData[]) {
    return articleData.map(
      (articleData) =>
        new Article(articleData, this.state, this.articleDao, this.userDao),
    );
  }

  public async selectTag(tag: string) {
    try {
      this.state.isLoading = true;

      if (!this.tags.includes(tag)) {
        console.warn("Tag not found");
        return;
      }

      await this.initialize(tag);

      this.tabs.push(new ContentTab(tag, ETab.Tag, async () => {}));

      this.tabs.forEach((tab) => {
        tab.isSelected = tab.id === ETab.Tag;
      });
    } catch (e) {
      console.error("Could not select tag");
    } finally {
      this.state.isLoading = false;
    }
  }

  public getSelectedTag() {
    return this.tabs.find((tab) => tab.id === ETab.Tag)?.name;
  }

  public async initialize(tag?: string, index = 0, username?: string) {
    console.warn({ tag, index, username });
    this.state.isLoading = true;

    this.pagination = new Pagination(async (_index) => {
      console.warn({ _index });
      await this.initialize(tag, _index, username);
    }, this.articleDao);

    return Promise.all([
      this.articleDao.getAllTags(),
      this.initializeTabs(),
      this.pagination.initialize(tag, username, index),
    ]).then(async ([tags]) => {
      this.articles = this.processArticles(
        await this.articleDao.getArticlesByPagination({
          tag,
          index,
          username,
        }),
      );

      this.tags = tags;
      this.state.isLoading = false;
    });
  }
}
