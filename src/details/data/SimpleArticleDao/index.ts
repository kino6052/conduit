import { IArticleDAO } from "../../../app/interfaces/data/ArticleDAO/types";
import { createProxy } from "../../../utils/oop";
import { ArticleCRUD } from "./ArticleCRUD";
import { ArticleComments } from "./ArticleComments";
import { ArticleLikes } from "./ArticleLikes";
import { ArticleSelectors } from "./ArticleSelectors";

export class SimpleArticleDAO {
  protected constructor() {}

  static create(generateDate: () => string, generateId: () => string) {
    const articleCRUD = new ArticleCRUD(generateDate, generateId);
    const articleSelectors = new ArticleSelectors(articleCRUD);
    const articleLikes = new ArticleLikes(articleCRUD);
    const articleComments = new ArticleComments(articleCRUD);

    return createProxy<IArticleDAO>([
      articleCRUD,
      articleSelectors,
      articleLikes,
      articleComments,
    ]);
  }
}
