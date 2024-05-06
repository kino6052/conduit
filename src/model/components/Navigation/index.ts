import { IArticleDAO } from "../../data/ArticleDAO/types";
import { IUserDAO } from "../../data/UserDAO/types";
import { HomePage } from "../../pages/ArticlePreviewPage/HomePage";
import { NewArticlePage } from "../../pages/NewArticlePage";
import { SettingsPage } from "../../pages/SettingsPage";
import { SignInPage } from "../../pages/SignInPage";
import { SignUpPage } from "../../pages/SignUpPage";
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
    changePage(new HomePage(state, articleDao, userDao), state),
  ),
  new NavigationTab("New Article", EPage.NewArticle, () =>
    changePage(new NewArticlePage(state, articleDao, userDao), state),
  ),
  new NavigationTab("Settings", EPage.Settings, () =>
    changePage(new SettingsPage(state, articleDao, userDao), state),
  ),
  new NavigationTab("Sign In", EPage.SignIn, () =>
    changePage(new SignInPage(state, articleDao, userDao), state),
  ),
  new NavigationTab("Sign Up", EPage.SignUp, () =>
    changePage(new SignUpPage(state, articleDao, userDao), state),
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
