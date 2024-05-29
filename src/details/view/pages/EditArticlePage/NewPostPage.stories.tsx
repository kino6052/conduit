import { EditArticlePage } from ".";
import { DefaultData } from "./data";
import { TEditArticlePageProps } from "./types";

export default {
  title: "Pages/NewPostPage",
  component: EditArticlePage,
  argTypes: {},
};

export const Default: { args: TEditArticlePageProps } = {
  args: DefaultData,
};
