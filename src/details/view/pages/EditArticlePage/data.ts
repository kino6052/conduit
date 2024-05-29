import { TEditArticlePageProps } from "./types";

export const DefaultData: TEditArticlePageProps = {
  onMount: async () => {},
  articleInputProps: {
    placeholder: "Article",
    value: "",
    onChange: async () => {},
  },
  tagsInputProps: {
    placeholder: "Tags",
    value: "",
    onChange: async () => {},
  },
  titleInputProps: {
    placeholder: "Title",
    value: "",
    onChange: async () => {},
  },
  buttonProps: {
    text: "Publish Article",
    onClick: async () => {},
  },
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
};
