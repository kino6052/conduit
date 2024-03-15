import { ArticlePage } from "../pages/ArticlePage";
import { HomePage } from "../pages/HomePage";
import { EditArticlePage } from "../pages/EditArticlePage";
import { ProfilePage } from "../pages/ProfilePage";
import { SettingsPage } from "../pages/SettingsPage";
import { SignInPage } from "../pages/SignInPage";
import { SignUpPage } from "../pages/SignUpPage";
import { EPage, TAppProps, TPagePropsMap } from "../types";

export type TPageMap = {
  [key in EPage]: React.FC<TPagePropsMap[key]>;
};

export const pagesMap = {} as TPageMap;

pagesMap[EPage.Home] = HomePage;
pagesMap[EPage.Article] = ArticlePage;
pagesMap[EPage.NewArticle] = EditArticlePage;
pagesMap[EPage.EditArticle] = EditArticlePage;
pagesMap[EPage.Settings] = SettingsPage;
pagesMap[EPage.Profile] = ProfilePage;
pagesMap[EPage.SignIn] = SignInPage;
pagesMap[EPage.SignUp] = SignUpPage;

export function getPropsFromStateSafely<T extends EPage>(
  page: T,
  state: TAppProps<EPage>,
): TAppProps<T> | undefined {
  if (state.page === page) return state as TAppProps<T>;

  return;
}
