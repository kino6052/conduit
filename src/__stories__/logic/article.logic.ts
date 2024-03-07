import { uniqueId } from "lodash";
import { filter, tap } from "rxjs";
import { Input } from "../../components/Input/Input";
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
import { getPropsFromStateSafely } from "../../utils/pagesMap";

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
    const state = getPropsFromStateSafely(
      EPage.Article,
      ResultingStateSubject.getValue(),
    );

    if (!state) return;

    const pageProps = state.pageProps;

    const currentPosts = PostsSubject.getValue();
    const id = uniqueId();
    const nextPosts = {
      ...currentPosts,
      [id]: {
        userInfoProps: {
          date: new Date().toISOString(),
          username: "username",
        },
        description: "",
        id,
        likes: 0,
        tags: [],
        title: "",
      },
    };
    PostInputValueSubject.next("");
    PostsSubject.next(nextPosts);
    CurrentPageSubject.next(EPage.Home);
  }),
).subscribe();
