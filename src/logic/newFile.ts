import { filter, tap } from "rxjs";
import {
  CurrentPageSubject,
  PostsSubject,
  UserInfoSubject,
} from "./common.logic";
import { EPage } from "../types";

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
