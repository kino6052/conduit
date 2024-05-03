import { EPage } from "../../types";
import { IArticleSource } from "../data/article/types";
import { IApp, INavbar, ITab } from "../types";

export class Tab implements ITab {
  constructor(
    public name: string,
    public id: string,
  ) {}

  public isSelected: boolean = false;
}

export class Navbar implements INavbar {
  public tabs: ITab[] = [
    new Tab(EPage.Home, "home"),
    new Tab(EPage.Profile, "profile"),
  ];

  selectTab(page: EPage) {
    this.selectedTab = page;
  }

  constructor(public selectedTab: EPage) {
    this.tabs.forEach((tab) => (tab.isSelected = tab.id === selectedTab));
  }
}

export class PaginationBar {
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

export class HomePage {
  public tags = [];
  public pagination = new PaginationBar();
  public articles = [];

  constructor(
    private navbar: INavbar,
    private articlesSource: IArticleSource,
  ) {}
}
