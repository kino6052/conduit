import { ArticlePage } from "../ArticlePage";
import { DefaultData } from "../ArticlePage/data";
import { TArticlePageProps } from "../ArticlePage/types";
import { THomePageProps } from "./types";

export default {
  title: "Scenarios/HomePage",
  component: ArticlePage,
  argTypes: {},
};

let input = "";

export const Step3: { args: TArticlePageProps } = {
  args: {
    ...DefaultData,
    commentBoxProps: {
      inputProps: {
        placeholder: "input",
      },
      buttonProps: {
        onClick: () => {
          window.open(
            "/?path=/story/pages-articlepage--default&viewMode=story&full=1&singleStory=true",
            "_blank",
          );
        },
      },
      iconProps: {
        icon: "favorite",
      },
    },
  },
};
