import { ArticlePage } from "../ArticlePage";
import { DefaultData } from "../ArticlePage/data";
import { TArticlePageProps } from "../ArticlePage/types";

export default {
  title: "Scenarios/HomePage",
  component: ArticlePage,
  argTypes: {},
};

let input = "";

export const Step2: { args: TArticlePageProps } = {
  args: {
    ...DefaultData,
    commentBoxProps: {
      inputProps: {
        placeholder: "input",
      },
      buttonProps: {
        onClick: () => {
          window.open("/?path=/story/scenarios-homepage--step-3", "_open");
        },
      },
      iconProps: {
        icon: "favorite",
      },
    },
    comments: [],
  },
};
