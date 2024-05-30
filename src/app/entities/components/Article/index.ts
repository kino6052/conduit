import { IArticleData } from "../../../interfaces/data/ArticleDAO/types";
import { IArticleService } from "../../../interfaces/services/ArticleService/types";
import { AuthorControl } from "../Control/AuthorControl";
import { LikeControl } from "../Control/LikeControl";
import { IControl } from "../Control/types";
import { ExclusiveSelector } from "../Selector/ExclusiveSelector";
import { ISelector } from "../Selector/types";
import { IArticle } from "./types";

export class Article implements IArticle {
  public authorControl: IControl;
  public likeControl: IControl;
  public tags: ISelector<{ id: string }> | undefined;

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

    this.tags = new ExclusiveSelector(
      articleData.tags.map((t) => ({ id: t, name: t })),
      async () => {},
    );
  }

  async read() {
    await this.articleService.readArticle(this.articleData.id);
  }
}
