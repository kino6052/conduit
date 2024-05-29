import { IArticleData } from "../../data/ArticleDAO/types";
import { IArticleService } from "../../services/ArticleService/types";
import { AuthorControl } from "../Control/AuthorControl";
import { LikeControl } from "../Control/LikeControl";
import { IControl } from "../Control/types";
import { IArticle } from "./types";

export class Article implements IArticle {
  public authorControl: IControl;
  public likeControl: IControl;

  constructor(
    public articleData: IArticleData,
    private articleService: IArticleService,
  ) {
    this.authorControl = new AuthorControl(
      articleData.username,
      articleService,
    );

    this.likeControl = new LikeControl(
      articleData.likers.length,
      articleData.id,
      articleService,
    );
  }

  async read() {
    console.warn(this);
    await this.articleService.readArticle(this.articleData.id);
  }
}
