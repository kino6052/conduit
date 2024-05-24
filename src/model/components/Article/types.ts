import { IArticleData } from "../../data/ArticleDAO/types";
import { Control } from "../Control";

export interface IArticle {
  articleData: IArticleData;
  authorControl: Control;
  likeControl: Control;
  read: () => Promise<void>;
}
