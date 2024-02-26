import { NewPostPage, TNewPostPageProps } from ".";

export default {
  title: "Pages/NewPostPage",
  component: NewPostPage,
  argTypes: {},
};

export const Default: { args: TNewPostPageProps } = {
  args: {
    articleInputProps: {
      value: "article",
    },
    titleInputProps: {
      value: "title",
    },
    buttonProps: {
      text: "Click me",
    },
    tagsInputProps: {
      value: "test",
    },
  },
};
