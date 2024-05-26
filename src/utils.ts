import { uniqueId } from "lodash";
import { IViewModel } from "./io/ui/view-model/types";
import { generateHomePageProps } from "./io/ui/view/pages/HomePage/store/selectors";
import { ArticleDAOTestDouble } from "./model/data/ArticleDAO";
import { EPage } from "./model/pages/types";
import { generateLoadingPageProps } from "./model/selectors";
import { UserDAOTestDouble } from "./model/data/UserDAO";
import { SimpleNavigationService } from "./model/services/NavigationService/implementations/SimpleNavigationService";
import { SimpleUserService } from "./model/services/UserService/implementations/SimpleUserService";
import { SimpleArticleService } from "./model/services/ArticleService/implementations/SimpleArticleService";
import { HomePage } from "./model/pages/ArticlePreviewPage/HomePage";
import { ViewModel } from "./io/ui/view-model";
import { ProfilePage } from "./model/pages/ArticlePreviewPage/ProfilePage";
import { generateProfilePageProps } from "./io/ui/view/pages/ProfilePage/store/selectors";
import { ArticlePage } from "./model/pages/ArticlePage";
import { EditArticlePage } from "./model/pages/EditArticlePage";
import { NewArticlePage } from "./model/pages/NewArticlePage";
import { SettingsPage } from "./model/pages/SettingsPage";
import { SignInPage } from "./model/pages/SignInPage";
import { SignUpPage } from "./model/pages/SignUpPage";

export const propsMap = {
  [EPage.Home]: generateHomePageProps,
  [EPage.Loading]: generateLoadingPageProps,
  [EPage.Profile]: generateProfilePageProps,
};

/** To be used only in the entry point of the application as
 * this is the ultimate detail (i.e. the dirtiest part) */
export const defaultComposeApp = (): IViewModel => {
  const articleDao = new ArticleDAOTestDouble(
    () => new Date(0).toISOString(),
    () => uniqueId("post"),
  );

  const userDao = new UserDAOTestDouble();
  const navigationService = new SimpleNavigationService({});
  const userService = new SimpleUserService(userDao, navigationService);

  const articleService = new SimpleArticleService(
    articleDao,
    navigationService,
    userService,
  );

  navigationService.constructors = {
    [EPage.Home]: () => HomePage.create(articleService, navigationService),
    [EPage.Profile]: (username: string) =>
      ProfilePage.create(
        username,
        articleService,
        navigationService,
        userService,
      ),
    [EPage.Article]: (articleId: string) =>
      ArticlePage.create(articleId, articleService, navigationService),
    [EPage.EditArticle]: (articleId: string) =>
      EditArticlePage.create(articleId, articleService, navigationService),
    [EPage.NewArticle]: () =>
      NewArticlePage.create("", articleService, navigationService),
    [EPage.Settings]: () => SettingsPage.create(userService, navigationService),
    [EPage.SignIn]: async () => new SignInPage(userService, navigationService),
    [EPage.SignUp]: async () => new SignUpPage(userService, navigationService),
  };

  const viewModel = new ViewModel(propsMap, navigationService);

  navigationService.navigate(EPage.Home).then(() => {
    viewModel.refresh();
  });

  return viewModel;
};
