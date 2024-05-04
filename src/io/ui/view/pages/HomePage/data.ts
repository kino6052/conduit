import { ETabVariant } from "../../components/Tab/types";
import { THomePageProps } from "./types";

export const DefaultData: THomePageProps = {
  isLoading: false,
  tabs: [
    {
      id: "1",
      text: "One",
      isActive: true,
      variant: ETabVariant.Default,
    },
  ],
  posts: [
    {
      description: "Description",
      id: "1",
      likes: 1,
      tags: [
        {
          id: "1",
        },
        {
          id: "1",
        },
      ],
      title: "Title",
      comments: [],
      hasLiked: true,
      userInfoProps: {
        date: "1st January",
        username: "John Lobster",
      },
    },
  ],
  sidebarProps: {
    title: "Popular tags",
    tags: [
      {
        id: "1",
      },
      {
        id: "2",
      },
      {
        id: "3",
      },
    ],
  },
  paginationBarProps: {
    numberOfPages: 2,
    selected: 0,
  },
};
