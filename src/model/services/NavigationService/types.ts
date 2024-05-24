import { EPage, IPage } from "../../pages/types";

export interface INavigationService {
  currentPage: IPage | undefined;
  navigate: (page: EPage) => Promise<void>;
  navigateToUserProfile: (username: string) => Promise<void>;
  navigateToArticle: (id: string) => Promise<void>;
}
