import { Button } from "../components/Button/Button";
import { InputSlug } from "../components/Input";
import { Link } from "../components/Link/Link";
import { ETabId } from "../components/Navbar/Navbar";
import { TPostProps } from "../components/Post/Post";
import { Tab } from "../components/Tab/Tab";
import { DefaultAppProps } from "./data";
import { ENewPostPageId } from "../pages/NewPostPage/types";
import { EPage, TAppProps, TCommonPageProps, getIsNewPostPage } from "../types";
import { IEvent } from "../utils/events";
import { uniqueId } from "lodash";

type TPost = {};

class Database {
  static Posts: TPostProps[] = [
    {
      id: "post-1",
      date: "01 January 2024",
      username: "Jane Lobster",
      description: "A good article, a really really good one",
      likes: 24,
      tags: ["first", "second", "third"],
      title: "A good thing",
    },
  ];
  static HasLiked: boolean = false;
}

const hasPressedEnter = (event: IEvent) => {
  return event.type === "onKeyDown" && event.event?.key === "Enter";
};

export const logic = async (
  event: IEvent,
  state: TAppProps<TCommonPageProps>,
): Promise<TAppProps<TCommonPageProps>> => {
  const pageProps = state.pageProps;
  if (getIsNewPostPage(state, pageProps)) {
    if (
      event.slug === InputSlug &&
      event.id === ENewPostPageId.PostId &&
      event.type === "onChange"
    ) {
      return {
        ...state,
        pageProps: {
          ...pageProps,
          input: event.event?.target?.value,
        },
      };
    }

    if (
      event.slug === InputSlug &&
      event.id === ENewPostPageId.PostId &&
      hasPressedEnter(event)
    ) {
      Database.Posts = [
        ...Database.Posts,
        {
          date: new Date().toISOString(),
          description: pageProps.input,
          id: uniqueId(),
          likes: 0,
          tags: [],
          title: pageProps.input,
          username: "username",
        },
      ];

      console.warn(Database.Posts);

      return {
        ...DefaultAppProps,
        pageProps: {
          ...DefaultAppProps.pageProps,
          posts: Database.Posts,
        },
      };
    }
  } else {
    pageProps.posts = [...Database.Posts];
    const postMap = Object.fromEntries(
      pageProps.posts?.map((post) => [post.id, post]),
    );

    if (
      event.slug === Link.name &&
      event.id &&
      Object.keys(postMap).includes(event.id)
    ) {
      const id = event.id;
      return {
        ...state,
        page: EPage.Article,
        pageProps: {
          ...pageProps,
          bannerProps: {
            ...pageProps.bannerProps,
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

            const hasLiked = Database.HasLiked;
            Database.HasLiked = !hasLiked;

            return {
              ...post,
              likes: post.likes + (hasLiked ? -1 : 1),
            };
          }),
        },
      };
    }
  }

  // TODO: Remove Tab.name and change it to slug that is exported from the index file
  if (event.slug === Tab.name && event.id === ETabId.Home) {
    return DefaultAppProps;
  }

  if (
    event.slug === Tab.name &&
    state.page !== EPage.NewPostPage &&
    event.id === ETabId.NewPost
  ) {
    return {
      page: EPage.NewPostPage,
      pageProps: {
        input: "",
      },
    };
  }

  return state;
};
