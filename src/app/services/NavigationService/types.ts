import { EPage, IPage } from "../../pages/types";

export interface INavigationService {
  currentPage: IPage | undefined;
  navigate: (
    page: Exclude<EPage, EPage.Article | EPage.Profile>,
  ) => Promise<void>;
  navigateToUserProfile: (username: string) => Promise<void>;
  navigateToArticle: (id: string, isEditing?: boolean) => Promise<void>;
  getNavigationTabs: () => EPage[];
}
