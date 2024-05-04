import { EPage } from "../../types";
import { IArticleData, IArticleSource } from "../data/article/types";
import { IApp, IAppState, IPage, ITab } from "../types";

interface INavigation {
  tabs: ITab[];
}

export const getTabs = (state: IAppState, articleSource: IArticleSource) => [
  new NavigationTab("Home", "home", () => {
    state.currentPage = new HomePage(state, articleSource);
  }),
  new NavigationTab("Article", "article", () => {
    state.currentPage = new ArticlePage("", state, articleSource);
  }),
];

export class NavigationTab implements ITab {
  constructor(
    public name: string,
    public id: string,
    public open: () => void,
  ) {}

  public isSelected: boolean = false;
}

export class AppState implements IAppState {
  currentPage: IPage | undefined;
  isLoading: boolean = false;
  currentUsername: string = "";
  selectedArticleId: string = "";
  selectedUsername: string = "";
  tabs: ITab[] = [];

  constructor() {}
}

export class Pagination {
  private _currentPageNumber = 0;
  public numberOfPages = 1;

  public get currentPageNumber() {
    return this._currentPageNumber;
  }

  public set currentPageNumber(currentPageNumber: number) {
    Math.max(this.numberOfPages, currentPageNumber);
  }

  constructor() {}
}

interface IArticle extends IArticleData {
  read(): void;
  examineUser(): void;
}

/**
 * This class is needed because there are multiple pages that can preview articles
 */
export class ArticlePreviewPage {
  public tags: string[] = [];
  public tabs: ITab[] = [];
  public pagination = new Pagination();
  public articles: IArticle[] = [];

  constructor(
    public state: IAppState,
    private articlesSource: IArticleSource,
  ) {
    this.state.isLoading = true;
    Promise.all([
      this.articlesSource.getArticles(),
      this.articlesSource.getAllTags(),
    ]).then(([articles, tags]) => {
      this.articles = articles.map(this.processArticleData.bind(this));
      this.tags = tags;
      this.state.isLoading = false;
    });
  }

  private processArticleData(articleData: IArticleData): IArticle {
    return {
      ...articleData,
      read: () => {
        this.state.selectedArticleId = articleData.id;
        this.state.currentPage = new ArticlePage(
          articleData.id,
          this.state,
          this.articlesSource,
        );
      },
      examineUser: () => {
        this.state.currentUsername = articleData.username;
        this.state.currentPage = new HomePage(this.state, this.articlesSource);
      },
    };
  }
}

export class HomePage extends ArticlePreviewPage {
  public pageType: EPage = EPage.Home;

  constructor(state: IAppState, articlesSource: IArticleSource) {
    super(state, articlesSource);
  }
}

export class ArticlePage implements IPage {
  public pageType: EPage = EPage.Article;
  public article: IArticleData | undefined;

  constructor(
    articleId: string,
    public state: IAppState,
    private articlesSource: IArticleSource,
  ) {
    this.articlesSource.getArticleById(articleId).then((article) => {
      this.article = article;
    });
  }
}
