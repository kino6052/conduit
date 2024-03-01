import { ETabVariant } from "../../components/Tab/types";
import { THomePageProps } from "./types";

export const DefaultData: THomePageProps = {
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
          text: "one",
        },
        {
          id: "1",
          text: "two",
        },
      ],
      title: "Title",
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
        text: "one",
      },
      {
        id: "2",
        text: "two",
      },
      {
        id: "3",
        text: "three",
      },
    ],
  },
  paginationBarProps: {
    numberOfPages: 2,
    selected: 0,
  },
};
