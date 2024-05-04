import { IArticleDAO } from "../../data/ArticleDAO/types";
import { IUserDAO } from "../../data/UserDAO/types";
import { ArticlePage } from "../../pages/ArticlePage";
import { HomePage } from "../../pages/ArticlePreviewPage/HomePage";
import { NewArticlePage } from "../../pages/NewArticlePage";
import { SettingsPage } from "../../pages/SettingsPage";
import { EPage, IPage } from "../../pages/types";
import { IAppState } from "../../types";
import { ITab } from "../Tab/types";

export const changePage = async (page: IPage, state: IAppState) => {
  state.isLoading = true;
  state.currentPage = page;
  await page.initialize();
  state.isLoading = false;
};

export const getTabs = (
  state: IAppState,
  articleDao: IArticleDAO,
  userDao: IUserDAO,
) => [
  new NavigationTab("Home", EPage.Home, () =>
    changePage(new HomePage(state, articleDao), state),
  ),
  new NavigationTab("New Article", EPage.NewArticle, () =>
    changePage(new NewArticlePage(state, articleDao), state),
  ),
  new NavigationTab("Settings", EPage.Settings, () =>
    changePage(new SettingsPage(state, articleDao, userDao), state),
  ),
  new NavigationTab("Sign In", EPage.SignIn, () =>
    changePage(new SettingsPage(state, articleDao, userDao), state),
  ),
  new NavigationTab("Sign Up", EPage.SignUp, () =>
    changePage(new SettingsPage(state, articleDao, userDao), state),
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
