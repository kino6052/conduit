import { ETabVariant } from "./io/ui/view/components/Tab/types";
import { EPage, TAppProps } from "./types";

export const DefaultAppProps: TAppProps<EPage.Home> = {
  page: EPage.Home,
  pageProps: {
    paginationBarProps: {
      numberOfPages: 1,
      selected: 0,
    },
    sidebarProps: {
      title: "Popular tags",
      tags: [],
    },
    posts: [],
    tabs: [
      { text: "Your feed", variant: ETabVariant.Default, id: "YourFeed" },
      {
        text: "Your feed",
        variant: ETabVariant.Default,
        id: "OtherTab",
      },
    ],
  },
  navbarProps: {
    tabs: [],
  },
};
