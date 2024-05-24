import { uniqueId } from "lodash";
import { ITab } from "./components/Tab/types";
import { ArticleDAOTestDouble } from "./data/ArticleDAO";
import { IArticleDAO } from "./data/ArticleDAO/types";
import { UserDAOTestDouble } from "./data/UserDAO";
import { IUserDAO } from "./data/UserDAO/types";
import { HomePage } from "./pages/ArticlePreviewPage/HomePage";
import { EPage, IPage } from "./pages/types";
import { IAppState } from "./types";
import { IViewModel, TPropsMap } from "../io/ui/view-model/types";
import { ViewModel } from "../io/ui/view-model";
import { generateHomePageProps } from "../io/ui/view/pages/HomePage/store/selectors";
import { ArticlePage } from "../io/ui/view/pages/ArticlePage";

export class AppState implements IAppState {
  currentPage: IPage | undefined;
  isLoading: boolean = false;
  currentUsername: string = "";
  selectedArticleId: string = "";
  selectedUsername: string = "";
  tabs: ITab[] = [];

  constructor(public articleDao: IArticleDAO, public userDao: IUserDAO) {}
}

// TODO: Create navigation service and just return page
export const defaultComposeApp = (): IViewModel => {
  const articleDao = new ArticleDAOTestDouble(
    () => new Date(0).toISOString(),
    () => uniqueId("post"),
  )

  const userDao = new UserDAOTestDouble()

  const userService = new UserService(userDao);
  const articleService = new ArticleService(articleDao, userService);
  
  const navigationService = new NavigationService({
    [EPage.Home]: () => new HomePage(articleService),
    [EPage.Article]: () => new ArticlePage(articleService) 
  });

  return new ViewModel(navigationService, {
    [EPage.Home]: generateHomePageProps,
    [EPage.Article]: generateArticlePageProps,
    [EPage.NewArticle]: generateNewArticlePageProps,
    [EPage.EditArticle]: generateNewArticlePageProps,
    [EPage.Profile]: generateProfilePageProps,
    [EPage.Settings]: generateSettingsPageProps,
    [EPage.SignIn]: generateSignInPageProps,
    [EPage.SignUp]: generateSignUpPageProps,
  })
};
