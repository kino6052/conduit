import { TArticlePageProps } from "./types";

export const DefaultData: TArticlePageProps = {
  bannerProps: {
    title: "Article Title",
    userInfoProps: {
      date: "January 1st",
      username: "John Lobster",
    },
  },
  commentBoxProps: {
    buttonProps: {
      text: "Comment",
    },
    iconProps: {
      icon: "favorite",
    },
    inputProps: {
      placeholder: "Your Comment",
      value: "",
    },
  },
  favoriteButtonProps: {
    text: "Favorite",
  },
  followButtonProps: {
    text: "Follow",
  },
  userInfoProps: {
    date: "January 2nd",
    username: "Jerry Tom",
  },
  content:
    "Omnis perspiciatis qui quia commodi sequi modi. Nostrum quam aut cupiditate est facere omnis possimus. Tenetur similique nemo illo soluta molestias facere quo. Ipsam totam facilis delectus nihil quidem soluta vel est omnis.",
  tags: [{ text: "One" }, { text: "Two" }, { text: "Three" }],
  comments: [
    {
      iconProps: {
        icon: "favorite",
      },
      inputProps: {
        placeholder: "Test",
        value: "Hey, this is a great article!",
      },
      id: "1",
    },
    {
      iconProps: {
        icon: "favorite",
      },
      inputProps: {
        placeholder: "Test",
        value: "Hey, this is a great article!",
      },
      id: "2",
    },
  ],
};
