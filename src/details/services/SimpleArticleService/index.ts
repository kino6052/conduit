import { IArticleDAO } from "../../../app/interfaces/data/ArticleDAO/types";
import { IArticleService } from "../../../app/interfaces/services/ArticleService/types";
import { INavigationService } from "../../../app/interfaces/services/NavigationService/types";
import { IUserService } from "../../../app/interfaces/services/UserService/types";
import { createProxy } from "../../../utils/oop";
import { ArticleCommentService } from "./ArticleCommentService";
import { ArticleLikeService } from "./ArticleLikeService";
import { ArticleManagementService } from "./ArticleManagementService";
import { ArticlePaginationService } from "./ArticlePaginationService";
import { ArticlePreparationService } from "./ArticlePreparationService";
import { ArticleReadingService } from "./ArticleReadingService";
import { AuthorExaminationService } from "./AuthorExamineService";
import { TabTagSelectionService } from "./TabTagSelectionService";

export class SimpleArticleService {
  protected constructor() {}

  static create({
    articleDAO,
    navigationService,
    userService,
  }: {
    articleDAO: IArticleDAO;
    navigationService: INavigationService;
    userService: IUserService;
  }) {
    const articleManagementService = new ArticleManagementService(
      articleDAO,
      navigationService,
      userService,
    );

    const articleCommentService = new ArticleCommentService(
      articleDAO,
      navigationService,
      userService,
    );

    const authorExaminationService = new AuthorExaminationService(
      navigationService,
    );

    const articleLikeService = new ArticleLikeService(
      articleDAO,
      navigationService,
      userService,
    );

    const articleReadingService = new ArticleReadingService(navigationService);

    const articlePreparationService = new ArticlePreparationService(
      navigationService,
      articleDAO,
      authorExaminationService,
      articleLikeService,
      articleReadingService,
    );

    const articlePaginationService = new ArticlePaginationService(
      articleDAO,
      articlePreparationService,
    );

    const tabTagSelectionService = new TabTagSelectionService(
      articlePaginationService,
      userService,
    );

    return createProxy<IArticleService>([
      articleManagementService,
      articleCommentService,
      articlePreparationService,
      articlePaginationService,
      articleLikeService,
      authorExaminationService,
      articleReadingService,
      tabTagSelectionService,
    ]);
  }
}
