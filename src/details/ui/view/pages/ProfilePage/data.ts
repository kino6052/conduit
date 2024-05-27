import { ETabVariant } from "../../components/Tab/types";
import { TProfilePageProps } from "./types";

export const DefaultData: TProfilePageProps = {
  bannerProps: {
    userInfoProps: {
      date: "January 1st",
      username: "John Lobster",
    },
    followButtonProps: {
      onClick: async () => {},
      text: "Follow",
    },
  },
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
      comments: [],
      hasLiked: true,
      likeButtonProps: {
        text: "test",
        onClick: async () => {},
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
    pages: [
      {
        isSelected: true,
        onClick: async () => {},
        text: "1",
      },
    ],
  },
};
