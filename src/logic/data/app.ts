import { EPage } from "../../types";

export class AppState {
  static selectedTagId: string | undefined;
  static currentUserId: string | undefined;
  static selectedUserId: string | undefined;
  static selectedArticleId: string | undefined;
  static currentPage: EPage = EPage.Home;
}
