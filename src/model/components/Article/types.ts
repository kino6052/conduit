import { IArticleData } from "../../data/ArticleDAO/types";

export interface IArticle extends IArticleData {
  read(): void;
  examineAuthor(): void;
  toggleLike(): void;
}
