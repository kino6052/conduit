import { IArticleData } from "../../data/ArticleDAO/types";
import { User } from "../User";

export interface IArticle {
  articleData: IArticleData;
  read(): Promise<void>;
  getAuthor(): Promise<User | undefined>;
  toggleLike(): Promise<void>;
}
