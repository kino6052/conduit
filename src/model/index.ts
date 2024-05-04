import { ITab } from "./components/Tab/types";
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
