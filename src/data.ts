import { EPage, TAppProps } from "./types";

export const DefaultAppProps: TAppProps = {
  page: EPage.Home,
  pageProps: {
    username: "eni9mu5",
    bannerProps: {
      variant: "default",
      heading: "Article text",
      userInfo: {
        date: "01 April 1990",
        username: "Test",
      },
    },
    sidebarProps: {
      title: "Popular tags",
      tags: ["one", "something", "chinese", "english", "french"],
    },
    posts: [
      {
        id: "post-1",
        date: "01 January 2024",
        username: "Jane Lobster",
        description: "A good article, a really really good one",
        likes: 24,
        tags: ["first", "second", "third"],
        title: "A good thing",
      },
      {
        id: "post-2",
        date: "01 January 2024",
        username: "Jane Lobster",
        description: "A good article, a really really good one",
        likes: 24,
        tags: ["first", "second", "third"],
        title: "A good thing",
      },
    ],
    tabs: [
      { text: "Your feed", variant: "selected" },
      { text: "Your feed", variant: "unselected", hasUnderline: false },
    ],
  },
};
