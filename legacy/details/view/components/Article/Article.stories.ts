import { Post } from ".";
import { TArticleProps } from "./types";

export default {
  title: "Components/Article",
  component: Post,
};

export const Default = {
  args: {
    title:
      "Try to transmit the HTTP card, maybe it will override the multi-byte hard drive!",
    description:
      "Try to transmit the HTTP card, maybe it will override the multi-byte hard drive!",
    likes: 64,
    id: "1",
    tags: [{ id: "1" }, { id: "2" }, { id: "3" }],
    userInfoProps: {
      date: "1st January 2024",
      username: "John Lobster",
    },
    comments: [],
    hasLiked: false,
  } as TArticleProps,
};
