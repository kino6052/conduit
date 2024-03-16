import { uniqueId } from "lodash";
import { BehaviorSubject, filter, tap } from "rxjs";
import { EButtonConstants } from "../../components/Button/constants";
import { EInputConstants } from "../../components/Input/Input/constants";
import { TPostProps } from "../../components/Post/types";
import { EArticlePageConstants } from "../../pages/ArticlePage/constants";
import { ENewPostPageConstant } from "../../pages/EditArticlePage/constants";
import { DefaultData } from "../../pages/EditArticlePage/data";
import { EPage, TAppProps } from "../../types";
import { findFirst } from "../../utils/array";
import { getEventTargetValue } from "../../utils/events";
import {
  CurrentArticleId,
  CurrentPageSubject,
  IncomingEventSubject,
  PostsSubject,
  ResultingStateSubject,
  UserInfoSubject,
} from "../common.logic";
import { getCurrentArticle } from "../utils/article-crud";

const TitleInputSubject = new BehaviorSubject("");
const ArticleInputSubject = new BehaviorSubject("");
const TagsInputSubject = new BehaviorSubject("");

const updateForm = () => {
  const prevState = ResultingStateSubject.getValue();
  const nextState: TAppProps<EPage.NewArticle> = {
    ...prevState,
    page: EPage.NewArticle,
    pageProps: {
      ...DefaultData,
      titleInputProps: {
        ...DefaultData.titleInputProps,
        value: TitleInputSubject.getValue(),
      },
      articleInputProps: {
        ...DefaultData.articleInputProps,
        value: ArticleInputSubject.getValue(),
      },
      tagsInputProps: {
        ...DefaultData.tagsInputProps,
        value: TagsInputSubject.getValue(),
      },
    },
  };
  ResultingStateSubject.next(nextState);
};

const resetForm = () => {
  TitleInputSubject.next("");
  ArticleInputSubject.next("");
  TagsInputSubject.next("");
};

CurrentPageSubject.pipe(
  filter((page) => [EPage.NewArticle, EPage.EditArticle].includes(page)),
  tap(resetForm),
  tap((page) => {
    const isEditing = page === EPage.EditArticle;
    if (!isEditing) return;

    const curr = getCurrentArticle();
    console.warn({ curr });

    TitleInputSubject.next(curr?.title ?? "");
    ArticleInputSubject.next(curr?.description ?? "");
    TagsInputSubject.next(curr?.tags.join(" ") ?? "");
  }),
  tap(updateForm),
).subscribe();

TitleInputSubject.pipe(tap(updateForm)).subscribe();
ArticleInputSubject.pipe(tap(updateForm)).subscribe();
TagsInputSubject.pipe(tap(updateForm)).subscribe();

IncomingEventSubject.pipe(
  filter(
    (event) =>
      event.slug === EInputConstants.Slug &&
      event.id === ENewPostPageConstant.TitleInputId,
  ),
  tap((event) => {
    const nextValue = getEventTargetValue(event);
    const previousValue = TitleInputSubject.getValue();
    TitleInputSubject.next(nextValue || previousValue);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter(
    (event) =>
      event.slug === EInputConstants.Slug &&
      event.id === ENewPostPageConstant.TextInputId,
  ),
  tap((event) => {
    const nextValue = getEventTargetValue(event);
    const previousValue = ArticleInputSubject.getValue();
    ArticleInputSubject.next(nextValue || previousValue);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter(
    (event) =>
      event.slug === EInputConstants.Slug &&
      event.id === ENewPostPageConstant.TagsInputId,
  ),
  tap((event) => {
    const nextValue = getEventTargetValue(event);
    const previousValue = TagsInputSubject.getValue();
    TagsInputSubject.next(nextValue || previousValue);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter(
    (event) =>
      event.slug === EButtonConstants.Slug &&
      event.id === ENewPostPageConstant.SubmitButtonId,
  ),
  tap(() => {
    const posts = PostsSubject.getValue();
    const page = CurrentPageSubject.getValue();
    const isEditing = page === EPage.EditArticle;
    const id = findFirst([
      isEditing && CurrentArticleId.getValue(),
      uniqueId(),
    ]);
    const userInfoProps = UserInfoSubject.getValue();

    if (!id || !userInfoProps) return;

    const post: TPostProps = {
      id,
      title: TitleInputSubject.getValue(),
      description: ArticleInputSubject.getValue(),
      userInfoProps: userInfoProps,
      likes: 0,
      hasLiked: false,
      tags: TagsInputSubject.getValue()
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

    const nextPosts = {
      ...posts,
      [id]: post,
    };
    PostsSubject.next(nextPosts);
    CurrentPageSubject.next(EPage.Home);
  }),
).subscribe();
