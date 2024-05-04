import { IArticleDAO } from "../../data/ArticleDAO/types";
import { ArticlePage } from "../../pages/ArticlePage";
import { HomePage } from "../../pages/ArticlePreviewPage/HomePage";
import { NewArticlePage } from "../../pages/NewArticlePage";
import { IPage } from "../../pages/types";
import { IAppState } from "../../types";
import { ITab } from "../Tab/types";

export const changePage = async (page: IPage, state: IAppState) => {
  state.isLoading = true;
  state.currentPage = page;
  await page.initialize();
  state.isLoading = false;
};

export const getTabs = (state: IAppState, articleSource: IArticleDAO) => [
  new NavigationTab("Home", "home", () =>
    changePage(new HomePage(state, articleSource), state),
  ),
  new NavigationTab("New Article", "article", () =>
    changePage(new NewArticlePage(state, articleSource), state),
  ),
];

export class NavigationTab implements ITab {
  constructor(
    public name: string,
    public id: string,
    public open: () => Promise<void>,
  ) {}

  public isSelected: boolean = false;
}
