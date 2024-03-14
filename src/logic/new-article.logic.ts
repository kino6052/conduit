import { BehaviorSubject, filter, tap } from "rxjs";
import { EInputConstants } from "../components/Input/Input/constants";
import { ENewPostPageConstant } from "../pages/NewPostPage/constants";
import { DefaultData } from "../pages/NewPostPage/data";
import { EPage, TAppProps } from "../types";
import {
  CurrentPageSubject,
  IncomingEventSubject,
  PostsSubject,
  ResultingStateSubject,
  UserInfoSubject,
} from "./common.logic";
import { EButtonConstants } from "../components/Button/constants";
import { uniqueId } from "lodash";
import { TPostProps } from "../components/Post/types";

const TitleInputSubject = new BehaviorSubject("");
const ArticleInputSubject = new BehaviorSubject("");
const TagsInputSubject = new BehaviorSubject("");

const updateForm = () => {
  const nextState: TAppProps<EPage.NewPostPage> = {
    page: EPage.NewPostPage,
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
  filter((page) => page === EPage.NewPostPage),
  tap(resetForm),
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
    const nextValue = event.event?.target?.value;
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
    const nextValue = event.event?.target?.value;
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
    const nextValue = event.event?.target?.value;
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
    const id = uniqueId();
    const nextPosts = {
      [id]: {
        id,
        title: TitleInputSubject.getValue(),
        description: ArticleInputSubject.getValue(),
        userInfoProps: UserInfoSubject.getValue(),
        likes: 0,
        tags: TagsInputSubject.getValue()
          .split(",")
          .join(" ")
          .split(" ")
          .filter(Boolean)
          .map((sub) => ({
            text: sub,
            id: sub,
          })),
      } as TPostProps,
      ...posts,
    };
    PostsSubject.next(nextPosts);
    CurrentPageSubject.next(EPage.Home);
  }),
).subscribe();
