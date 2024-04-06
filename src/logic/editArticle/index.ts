import { uniqueId } from "lodash";
import { filter, tap } from "rxjs";
import { TArticleProps } from "../../components/Article/types";
import { EButtonConstants } from "../../components/Button/constants";
import { EInputConstants } from "../../components/Input/Input/constants";
import { ENewPostPageConstant } from "../../pages/EditArticlePage/constants";
import { DefaultData } from "../../pages/EditArticlePage/data";
import { EPage, TAppProps } from "../../types";
import { findFirst } from "../../utils/array";
import { getEventTargetValue } from "../../utils/events";
import {
  IncomingEventSubject,
  RefreshSubject,
  ResultingStateSubject,
} from "../common.logic";
import { AppState } from "../data/app";
import { ArticleDatabase } from "../data/article";
import { UserDatabase } from "../data/user";
import { updatePage } from "../utils/utils";
import { processTags } from "./utils";
import { TArticle } from "../data/article/types";
import { DEFAULT_TIME } from "../utils/verification";

let titleInput = "";
let articleInput = "";
let tagsInput = "";

const refreshForm = () => {
  updatePage();
};

const updateForm = () => {
  const prevState = ResultingStateSubject.getValue();
  const nextState: TAppProps<EPage.NewArticle> = {
    ...prevState,
    page: EPage.NewArticle,
    pageProps: {
      ...DefaultData,
      titleInputProps: {
        ...DefaultData.titleInputProps,
        value: titleInput,
      },
      articleInputProps: {
        ...DefaultData.articleInputProps,
        value: articleInput,
      },
      tagsInputProps: {
        ...DefaultData.tagsInputProps,
        value: tagsInput,
      },
      tags: processTags(tagsInput).map((id) => ({ id })),
    },
  };
  ResultingStateSubject.next(nextState);
};

RefreshSubject.pipe(
  filter(() =>
    [EPage.NewArticle, EPage.EditArticle].includes(AppState.currentPage),
  ),
  tap((page) => {
    const isEditing = page === EPage.EditArticle;

    if (!isEditing) return;

    const curr = AppState.getCurrentArticle();

    titleInput = curr?.title ?? "";
    articleInput = curr?.description ?? "";
    tagsInput = curr?.tags.join(" ") ?? "";
  }),
  tap(updateForm),
).subscribe();

IncomingEventSubject.pipe(
  filter(
    (event) =>
      event.slug === EInputConstants.Slug &&
      event.id === ENewPostPageConstant.TitleInputId,
  ),
  tap((event) => {
    const nextValue = getEventTargetValue(event);
    titleInput = nextValue ?? titleInput;
  }),
  tap(refreshForm),
).subscribe();

IncomingEventSubject.pipe(
  filter(
    (event) =>
      event.slug === EInputConstants.Slug &&
      event.id === ENewPostPageConstant.TextInputId,
  ),
  tap((event) => {
    const nextValue = getEventTargetValue(event);
    articleInput = nextValue ?? articleInput;
  }),
  tap(refreshForm),
).subscribe();

IncomingEventSubject.pipe(
  filter(
    (event) =>
      event.slug === EInputConstants.Slug &&
      event.id === ENewPostPageConstant.TagsInputId,
  ),
  tap((event) => {
    const nextValue = getEventTargetValue(event);
    tagsInput = nextValue ?? tagsInput;
  }),
  tap(refreshForm),
).subscribe();

IncomingEventSubject.pipe(
  filter(
    (event) =>
      event.slug === EButtonConstants.Slug &&
      event.id === ENewPostPageConstant.SubmitButtonId,
  ),
  tap(() => {
    const page = AppState.currentPage;
    const isEditing = page === EPage.EditArticle;
    const id = findFirst([
      isEditing && AppState.selectedArticleId,
      uniqueId("post-"),
    ]);

    const username = AppState.currentUserId;

    if (!username) return;

    const userInfoProps = UserDatabase.findUserByName(username);

    if (!id || !userInfoProps) return;

    const article: TArticle = {
      id,
      title: titleInput,
      description: articleInput,
      username,
      likers: [],
      tags: processTags(tagsInput),
      comments: [],
      date: new Date(DEFAULT_TIME).toDateString(),
    };

    ArticleDatabase.publishArticle(article);
    updatePage(EPage.Home);
  }),
).subscribe();
