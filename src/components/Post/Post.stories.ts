import { Post } from ".";
import { TPostProps } from "./types";

export default {
  title: "Components/Post",
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
    tags: [
      { id: "1", text: "One" },
      { id: "2", text: "Two" },
      { id: "3", text: "Three" },
    ],
    userInfoProps: {
      date: "1st January 2024",
      username: "John Lobster",
    },
  } as TPostProps,
};
