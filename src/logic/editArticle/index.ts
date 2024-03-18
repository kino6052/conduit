import { uniqueId } from "lodash";
import { BehaviorSubject, filter, tap } from "rxjs";
import { TArticleProps } from "../../components/Article/types";
import { EButtonConstants } from "../../components/Button/constants";
import { EInputConstants } from "../../components/Input/Input/constants";
import { ENewPostPageConstant } from "../../pages/EditArticlePage/constants";
import { DefaultData } from "../../pages/EditArticlePage/data";
import { EPage, TAppProps } from "../../types";
import { findFirst } from "../../utils/array";
import { getEventTargetValue } from "../../utils/events";
import {
  CurrentPageSubject,
  IncomingEventSubject,
  ResultingStateSubject,
  UserInfoSubject,
} from "../common.logic";
import { ArticleDatabase } from "../data/article";

let titleInput = "";
let articleInput = "";
let tagsInput = "";

const refreshForm = () => {
  CurrentPageSubject.next(EPage.EditArticle);
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
    },
  };
  ResultingStateSubject.next(nextState);
};

const resetForm = () => {
  titleInput = "";
  articleInput = "";
  tagsInput = "";
};

CurrentPageSubject.pipe(
  filter((page) => [EPage.NewArticle, EPage.EditArticle].includes(page)),
  tap(resetForm),
  tap((page) => {
    const isEditing = page === EPage.EditArticle;

    if (!isEditing) return;

    const curr = ArticleDatabase.getCurrentArticle();

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
    const page = CurrentPageSubject.getValue();
    const isEditing = page === EPage.EditArticle;
    const id = findFirst([
      isEditing && ArticleDatabase.getCurrentArticleId(),
      uniqueId(),
    ]);
    const userInfoProps = UserInfoSubject.getValue();

    if (!id || !userInfoProps) return;

    const article: TArticleProps = {
      id,
      title: titleInput,
      description: articleInput,
      userInfoProps: userInfoProps,
      likes: 0,
      hasLiked: false,
      tags: tagsInput
        .split(",")
        .join(" ")
        .split(" ")
        .filter(Boolean)
        .map((sub) => ({
          text: sub,
          id: sub,
        })),
      comments: [],
    };

    ArticleDatabase.publishArticle(article);
    CurrentPageSubject.next(EPage.Home);
  }),
).subscribe();
