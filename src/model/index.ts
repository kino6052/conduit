import { uniqueId } from "lodash";
import { getTabs } from "./components/Navigation";
import { ITab } from "./components/Tab/types";
import { ArticleDAOTestDouble } from "./data/ArticleDAO";
import { IArticleDAO } from "./data/ArticleDAO/types";
import { UserDAOTestDouble } from "./data/UserDAO";
import { IUserDAO } from "./data/UserDAO/types";
import { HomePage } from "./pages/ArticlePreviewPage/HomePage";
import { IPage } from "./pages/types";
import { IAppState } from "./types";

export class AppState implements IAppState {
  currentPage: IPage | undefined;
  isLoading: boolean = false;
  currentUsername: string = "";
  selectedArticleId: string = "";
  selectedUsername: string = "";
  tabs: ITab[] = [];

  constructor() {}
}

export const initializeAppState = (
  articleDao: IArticleDAO = new ArticleDAOTestDouble(
    () => new Date(0).toISOString(),
    () => uniqueId("post"),
  ),
  userDao: IUserDAO = new UserDAOTestDouble(),
) => {
  const state = new AppState();

  state.currentPage = new HomePage(state, articleDao, userDao);

  return state;
};
