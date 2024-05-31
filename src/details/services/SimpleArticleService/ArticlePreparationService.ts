import { Article } from "../../../app/entities/components/Article";
import { IArticle } from "../../../app/entities/components/Article/types";
import { EPage } from "../../../app/entities/pages/types";
import {
  IArticleDAO,
  IArticleData,
} from "../../../app/interfaces/data/ArticleDAO/types";
import {
  IArticleLikeService,
  IArticlePreparationService,
  IArticleReadingService,
  IAuthorExaminationService,
} from "../../../app/interfaces/services/ArticleService/types";
import { INavigationService } from "../../../app/interfaces/services/NavigationService/types";

export class ArticlePreparationService implements IArticlePreparationService {
  constructor(
    private navigationService: INavigationService,
    private articleDao: IArticleDAO,
    private authorExaminationService: IAuthorExaminationService,
    private articleLikeService: IArticleLikeService,
    private articleReadingService: IArticleReadingService,
  ) {}

  public async prepareArticle(
    articleId: string,
  ): Promise<IArticle | undefined> {
    const articleData = await this.articleDao.getArticleById(articleId);
    if (!articleData) {
      this.navigationService.navigate(EPage.Home);
      return;
    }
    const article = new Article(
      articleData,
      this.authorExaminationService,
      this.articleLikeService,
      this.articleReadingService,
    );
    return article;
  }

  public prepareArticleSync(articleData: IArticleData): IArticle {
    const article = new Article(
      articleData,
      this.authorExaminationService,
      this.articleLikeService,
      this.articleReadingService,
    );
    return article;
  }
}
