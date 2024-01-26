import { uniqueId } from "lodash";
import { filter, tap } from "rxjs";
import { Input } from "../../components/Input";
import { ENewPostPageId } from "../../pages/NewPostPage/types";
import { EPage } from "../../types";
import {
  CurrentPageSubject,
  IncomingEventSubject,
  PostInputValueSubject,
  PostsSubject,
  ResultingStateSubject,
  hasPressedEnter,
} from "./common.logic";

IncomingEventSubject.pipe(
  filter((event) => {
    return (
      event.slug === Input.displayName &&
      event.id === ENewPostPageId.PostId &&
      event.type === "onChange"
    );
  }),
  tap((event) => {
    const target = event.event?.target as { value?: string };
    const nextValue = target.value ?? "";
    PostInputValueSubject.next(nextValue);
  }),
).subscribe();

IncomingEventSubject.pipe(
  filter((event) => {
    return (
      event.slug === Input.displayName &&
      event.id === ENewPostPageId.PostId &&
      hasPressedEnter(event)
    );
  }),
  tap(() => {
    const state = ResultingStateSubject.getValue();
    const pageProps = state.pageProps;

    if (!pageProps.input) return;

    const currentPosts = PostsSubject.getValue();
    const id = uniqueId();
    const nextPosts = {
      ...currentPosts,
      [id]: {
        date: new Date().toISOString(),
        description: pageProps.input,
        id,
        likes: 0,
        tags: [],
        title: pageProps.input,
        username: "username",
      },
    };
    PostInputValueSubject.next("");
    PostsSubject.next(nextPosts);
    CurrentPageSubject.next(EPage.Home);
  }),
).subscribe();
