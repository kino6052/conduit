import { getTabs } from "./components/Navigation";
import { ITab } from "./components/Tab/types";
import { ArticleDatabase } from "./data/ArticleSource";
import { IArticleSource } from "./data/ArticleSource/types";
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
  articleSource: IArticleSource = new ArticleDatabase(),
) => {
  const state = new AppState();

  state.currentPage = new HomePage(state, articleSource);
  state.tabs = getTabs(state, articleSource);

  return state;
};
