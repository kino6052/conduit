import { filter, tap } from "rxjs";
import { IncomingEventSubject } from "../navbar/common.logic";
import { EArticleConstant } from "../../components/Article/constants";
import { ArticleLogic } from "./logic";

IncomingEventSubject.pipe(
  filter((event) => event.slug === EArticleConstant.Slug),
  tap(ArticleLogic.handleArticleClick),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.slug === EArticleConstant.LikeButtonSlug),
  tap(ArticleLogic.handleArticleLike),
).subscribe();
