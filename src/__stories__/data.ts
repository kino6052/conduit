import { TPageProps } from "../pages/types";
import { EPage, TAppProps, TCommonPageProps } from "../types";

export const DefaultAppProps: TAppProps<TPageProps> = {
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
    posts: [],
    tabs: [
      { text: "Your feed", variant: "selected", id: "YourFeed" },
      {
        text: "Your feed",
        variant: "unselected",
        hasUnderline: false,
        id: "OtherTab",
      },
    ],
  },
};
