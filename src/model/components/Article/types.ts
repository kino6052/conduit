import { IArticleData } from "../../data/ArticleSource/types";

export interface IArticle extends IArticleData {
  read(): void;
  examineAuthor(): void;
}
