import { filter, tap } from "rxjs";
import { IncomingEventSubject } from "../common.logic";
import { EArticleConstant } from "../../io/ui/view/components/Article/constants";
import { ArticleLogic } from "./logic";

IncomingEventSubject.pipe(
  filter((event) => event.slug === EArticleConstant.Slug),
  tap(ArticleLogic.handleArticleClick),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => event.slug === EArticleConstant.LikeButtonSlug),
  tap(ArticleLogic.handleArticleLike),
).subscribe();
