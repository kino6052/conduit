import { TNewPostPageProps } from "./types";

export const DefaultData: TNewPostPageProps = {
  articleInputProps: {
    placeholder: "Article",
    value: "",
  },
  tagsInputProps: {
    placeholder: "Tags",
    value: "",
  },
  titleInputProps: {
    placeholder: "Title",
    value: "",
  },
  buttonProps: {
    text: "Publish Article",
  },
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
};
