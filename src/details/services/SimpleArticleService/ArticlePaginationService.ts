import { IArticle } from "../../../app/entities/components/Article/types";
import { IArticleDAO } from "../../../app/interfaces/data/ArticleDAO/types";
import {
  IArticlePaginationService,
  IArticlePreparationService,
} from "../../../app/interfaces/services/ArticleService/types";
import { EAppConstant } from "../../constants";

export class ArticlePaginationService implements IArticlePaginationService {
  constructor(
    private articleDao: IArticleDAO,
    private articlePreparationService: IArticlePreparationService,
  ) {}

  public async getDataForPagination(
    pageIndex?: number,
    tag?: string,
    username?: string,
  ): Promise<{
    tags: string[];
    articles: IArticle[];
    numberOfPages: number;
  }> {
    return Promise.all([
      this.articleDao.getAllTags(),
      this.articleDao.getArticlePaginationTotal({
        articlesPerPage: EAppConstant.ArticlesPerPage,
        tag,
        username,
      }),
      this.articleDao.getArticlesByPagination({
        tag,
        index: pageIndex,
        username,
      }),
    ]).then(([tags, numberOfPages, articles]) => ({
      tags,
      numberOfPages,
      articles: articles.map((a) =>
        this.articlePreparationService.prepareArticleSync(a),
      ),
    }));
  }
}
