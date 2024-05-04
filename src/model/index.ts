import { getTabs } from "./components/Navigation";
import { ITab } from "./components/Tab/types";
import { ArticleDAOTestDouble } from "./data/ArticleDAO";
import { IArticleDAO } from "./data/ArticleDAO/types";
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
  articleSource: IArticleDAO = new ArticleDAOTestDouble(),
) => {
  const state = new AppState();

  state.currentPage = new HomePage(state, articleSource);
  state.tabs = getTabs(state, articleSource);

  return state;
};
