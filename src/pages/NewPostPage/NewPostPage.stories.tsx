import { NewPostPage } from ".";
import { DefaultData } from "./data";
import { TNewPostPageProps } from "./types";

export default {
  title: "Pages/NewPostPage",
  component: NewPostPage,
  argTypes: {},
};

export const Default: { args: TNewPostPageProps } = {
  args: DefaultData,
};
