import { TArticlePageProps } from "./types";

export const DefaultData: TArticlePageProps = {
  onMount: async () => {},
  bannerProps: {
    title: "Article Title",
    userInfoProps: {
      date: "January 1st",
      username: "John Lobster",
      onClick: async () => {},
    },
  },
  commentBoxProps: {
    buttonProps: {
      text: "Comment",
      onClick: async () => {},
    },
    iconProps: {
      icon: "favorite",
    },
    inputProps: {
      placeholder: "Your Comment",
      value: "",
      onChange: async () => {},
    },
  },
  favoriteButtonProps: {
    text: "Favorite",
    onClick: async () => {},
  },
  followButtonProps: {
    text: "Follow",
    onClick: async () => {},
  },
  userInfoProps: {
    date: "January 2nd",
    username: "Jerry Tom",
    onClick: async () => {},
  },
  content:
    "Omnis perspiciatis qui quia commodi sequi modi. Nostrum quam aut cupiditate est facere omnis possimus. Tenetur similique nemo illo soluta molestias facere quo. Ipsam totam facilis delectus nihil quidem soluta vel est omnis.",
  tags: [
    { id: "One", onClick: async () => {} },
    { id: "Two", onClick: async () => {} },
    { id: "Three", onClick: async () => {} },
  ],
  comments: [
    {
      iconProps: {
        icon: "favorite",
      },
      inputProps: {
        placeholder: "Test",
        value: "Hey, this is a great article!",
        onChange: async () => {},
      },
    },
    {
      iconProps: {
        icon: "favorite",
      },
      inputProps: {
        placeholder: "Test",
        value: "Hey, this is a great article!",
        onChange: async () => {},
      },
    },
  ],
};
