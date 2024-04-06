import { filter, tap } from "rxjs";
import { EArticleBannerConstant } from "../../components/Banner/ArticleBanner/constants";
import { EButtonConstants } from "../../components/Button/constants";
import { EInputConstants } from "../../components/Input/Input/constants";
import { EArticlePageConstants } from "../../pages/ArticlePage/constants";

import { EPage } from "../../types";
import { IncomingEventSubject, RefreshSubject } from "../navbar/common.logic";
import { AppState } from "../data/app";
import { updatePage } from "../utils/utils";
import { ArticleLogic } from "./logic";

RefreshSubject.pipe(
  filter(() => AppState.currentPage === EPage.Article),
  tap(ArticleLogic.update),
).subscribe();

const ArticlePageIncomingEventSubject = IncomingEventSubject.pipe(
  filter(() => AppState.currentPage === EPage.Article),
);

ArticlePageIncomingEventSubject.pipe(
  filter(
    (event) =>
      event.slug === EButtonConstants.Slug &&
      event.id === EArticleBannerConstant.EditButtonId,
  ),
  tap(() => {
    updatePage(EPage.EditArticle);
  }),
).subscribe();

ArticlePageIncomingEventSubject.pipe(
  filter(
    (event) =>
      event.slug === EButtonConstants.Slug &&
      event.id === EArticlePageConstants.SubmitCommentButtonId,
  ),
  tap(ArticleLogic.submitComment),
).subscribe();

ArticlePageIncomingEventSubject.pipe(
  filter(
    (event) =>
      event.slug === EInputConstants.Slug &&
      event.id === EArticlePageConstants.CommentInputId,
  ),
  tap(ArticleLogic.handleCommentInput),
).subscribe();

ArticlePageIncomingEventSubject.pipe(
  filter(
    (event) =>
      event.slug === EButtonConstants.Slug &&
      event.id === EArticleBannerConstant.RemoveButtonId,
  ),
  tap(ArticleLogic.handleRemove),
).subscribe();
