import { ETabType } from "../../io/ui/view/components/Tabs/constants";
import { EPage } from "../../io/ui/view/types";
import { ArticleDatabase } from "./article";

export class AppState {
  static isLoading: boolean = false;
  static selectedTagId: string | undefined;
  static currentUserId: string | undefined;
  static selectedUserId: string | undefined;
  static selectedArticleId: string | undefined;
  static currentPage: EPage = EPage.Home;
  static currentTab: ETabType = ETabType.Global;
  static currentPaginationTabIndex: number = 0;

  static getCurrentArticle() {
    const articleId = AppState.selectedArticleId;

    if (!articleId) return;

    return ArticleDatabase.getArticleById(articleId);
  }
}
