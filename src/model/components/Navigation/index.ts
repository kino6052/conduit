import { IArticleSource } from "../../data/ArticleSource/types";
import { ArticlePage } from "../../pages/ArticlePage";
import { HomePage } from "../../pages/ArticlePreviewPage/HomePage";
import { IAppState } from "../../types";
import { ITab } from "../Tab/types";

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
