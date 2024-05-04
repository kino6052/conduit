import { EPage } from "../types";
import { TPageMap } from "./app/map";

export interface ITab {
  name: string;
  id: string;
  isSelected: boolean;
  open: () => void;
}

export interface IAppState {
  currentPage: IPage | undefined;
  currentUsername: string;
  selectedUsername: string;
  selectedArticleId: string;
  isLoading: boolean;
  tabs: ITab[];
}

export interface IPage {
  pageType: EPage;
}

export interface IApp {
  pageMap: TPageMap;
  state: IAppState;
}
