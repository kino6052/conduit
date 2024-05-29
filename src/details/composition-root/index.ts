import { uniqueId } from "lodash";
import { SimpleArticleDao } from "../data/SimpleArticleDao";
import { SimpleUserDao } from "../data/SimpleUserDao";
import { SimpleArticleService } from "../services/SimpleArticleService";
import { SimpleNavigationService } from "../services/SimpleNavigationService";
import { IUserContext } from "../../app/interfaces/services/UserContext/types";
import { SimpleUserService } from "../services/SimpleUserService";
import { ViewModel } from "../../app/view-model";
import { IViewModel } from "../../app/view-model/types";
import { generateArticlePageProps } from "../view/pages/ArticlePage/store/selectors";
import { generateNewArticlePageProps } from "../view/pages/EditArticlePage/store/selectors";
import { generateHomePageProps } from "../view/pages/HomePage/store/selectors";
import { generateProfilePageProps } from "../view/pages/ProfilePage/store/selectors";
import { generateSettingsPageProps } from "../view/pages/SettingsPage/store/selectors";
import { generateSignInPageProps } from "../view/pages/SignInPage/store/selectors";
import { generateSignUpPageProps } from "../view/pages/SignUpPage/store/selectors";
import { generateLoadingPageProps } from "../view/selectors";
import { EPage } from "../../app/entities/pages/types";
import { HomePage } from "../../app/entities/pages/ArticlePreviewPage/HomePage";
import { ProfilePage } from "../../app/entities/pages/ArticlePreviewPage/ProfilePage";
import { ArticlePage } from "../../app/entities/pages/ArticlePage";
import { EditArticlePage } from "../../app/entities/pages/EditArticlePage";
import { SettingsPage } from "../../app/entities/pages/SettingsPage";
import { SignInPage } from "../../app/entities/pages/SignInPage";
import { SignUpPage } from "../../app/entities/pages/SignUpPage";

/** To be used only in the entry point of the application as
 * this is the ultimate detail (i.e. the dirtiest part) */
export const defaultComposeApp = (): IViewModel => {
  const propsMap = {
    [EPage.Home]: generateHomePageProps,
    [EPage.Loading]: generateLoadingPageProps,
    [EPage.Profile]: generateProfilePageProps,
    [EPage.Article]: generateArticlePageProps,
    [EPage.Settings]: generateSettingsPageProps,
    [EPage.SignIn]: generateSignInPageProps,
    [EPage.SignUp]: generateSignUpPageProps,
    [EPage.NewArticle]: generateNewArticlePageProps,
    [EPage.EditArticle]: generateNewArticlePageProps,
  };

  const articleDao = new SimpleArticleDao(
    () => new Date(0).toISOString(),
    () => uniqueId("post"),
  );

  const userContext = {} as IUserContext;
  const userDao = new SimpleUserDao();
  const navigationService = new SimpleNavigationService({}, userContext);
  const userService = new SimpleUserService(
    userDao,
    navigationService,
    userContext,
  );

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
      EditArticlePage.create("", articleService, navigationService),
    [EPage.Settings]: async () =>
      SettingsPage.create(userService, navigationService),
    [EPage.SignIn]: async () => new SignInPage(userService, navigationService),
    [EPage.SignUp]: async () => new SignUpPage(userService, navigationService),
  };

  const viewModel = new ViewModel(propsMap, navigationService);

  navigationService.navigate(EPage.Home).then(() => {
    viewModel.refresh();
  });

  return viewModel;
};
