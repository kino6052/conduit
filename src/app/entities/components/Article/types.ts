import { IArticleData } from "../../../interfaces/data/ArticleDAO/types";
import { IControl } from "../Control/types";

export interface IArticle {
  articleData: IArticleData;
  authorControl: IControl;
  likeControl: IControl;
  read: () => Promise<void>;
}
