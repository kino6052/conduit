import { Button } from "../components/Button/Button";
import { Link } from "../components/Link/Link";
import { TAppProps } from "../types";
import { IEvent } from "../utils/events";

type TPost = {};

class Database {
  posts: TPost;
}

export const logic = async (
  event: IEvent,
  state: TAppProps,
): Promise<TAppProps> => {
  const pageProps = state.pageProps;
  const postMap = Object.fromEntries(
    pageProps.posts.map((post) => [post.id, post]),
  );
  if (
    event.slug === Link.name &&
    event.id &&
    Object.keys(postMap).includes(event.id)
  ) {
    const id = event.id;
    return {
      ...state,
      pageProps: {
        ...pageProps,
        banner: {
          ...pageProps.banner,
          heading: postMap[id].title,
          variant: "article",
        },
      },
    };
  }

  if (event.slug === Button.name) {
    return {
      ...state,
      pageProps: {
        ...pageProps,
        posts: pageProps.posts.map((post) => {
          if (post.id !== event.id) return post;

          return {
            ...post,
            likes: post.likes + 1,
          };
        }),
      },
    };
  }

  return state;
};
