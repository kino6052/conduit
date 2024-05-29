import { ETabVariant } from "../../components/Tab/types";
import { THomePageProps } from "./types";

export const DefaultData: THomePageProps = {
  isLoading: false,
  onMount: async () => {},
  tabs: [
    {
      id: "1",
      text: "One",
      isActive: true,
      variant: ETabVariant.Default,
      onClick: async () => {},
    },
  ],
  posts: [
    {
      description: "Description",
      id: "1",
      likeButtonProps: {
        onClick: async () => {},
        text: "test",
      },
      linkProps: {
        onClick: async () => {},
      },
      tags: [
        {
          id: "1",
          onClick: async () => {},
        },
        {
          id: "1",
          onClick: async () => {},
        },
      ],
      title: "Title",
      comments: [],
      hasLiked: true,
      userInfoProps: {
        date: "1st January",
        username: "John Lobster",
        onClick: async () => {},
      },
    },
  ],
  sidebarProps: {
    title: "Popular tags",
    tags: [
      {
        id: "1",
        onClick: async () => {},
      },
      {
        id: "2",
        onClick: async () => {},
      },
      {
        id: "3",
        onClick: async () => {},
      },
    ],
  },
  paginationBarProps: {
    pages: [{ isSelected: true, onClick: async () => {}, text: "1" }],
  },
};
