import { ArticlePage } from ".";
import { DefaultData } from "./data";
import { TArticlePageProps } from "./types";

export default {
  title: "Pages/ArticlePage",
  component: ArticlePage,
  argTypes: {},
};

export const Default: { args: TArticlePageProps } = {
  args: DefaultData,
};
