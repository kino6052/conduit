import { IArticleData } from "../../../interfaces/data/ArticleDAO/types";
import {
  IArticleLikeService,
  IArticleReadingService,
  IAuthorExaminationService,
} from "../../../interfaces/services/ArticleService/types";
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
    private authorExaminationService: IAuthorExaminationService,
    private articleLikeService: IArticleLikeService,
    private articleReadingService: IArticleReadingService,
  ) {
    this.authorControl = new AuthorControl(
      articleData.username,
      this.authorExaminationService,
    );

    this.likeControl = new LikeControl(
      articleData.likers.length,
      articleData.id,
      this.articleLikeService,
    );

    this.tags = new ExclusiveSelector(
      articleData.tags.map((t) => ({ id: t, name: t })),
      async () => {},
    );
  }

  async read() {
    await this.articleReadingService.readArticle(this.articleData.id);
  }
}
