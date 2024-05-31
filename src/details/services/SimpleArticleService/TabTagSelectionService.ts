import { ETab } from "../../../app/entities/pages/ArticlePreviewPage/constants";
import {
  IArticlePaginationService,
  ITabTagSelectionService,
} from "../../../app/interfaces/services/ArticleService/types";
import { IUserService } from "../../../app/interfaces/services/UserService/types";

export class TabTagSelectionService implements ITabTagSelectionService {
  constructor(
    private articlePaginationService: IArticlePaginationService,
    private userService: IUserService,
  ) {}

  public async selectTab(tabId: ETab): Promise<void> {
    if (tabId === ETab.YourFeed) {
      await this.articlePaginationService.getDataForPagination(
        0,
        undefined,
        this.userService.currentUser,
      );
      return;
    }
    this.articlePaginationService.getDataForPagination();
  }

  public async selectTag(tag: string): Promise<void> {
    await this.articlePaginationService.getDataForPagination(0, tag);
  }
}
