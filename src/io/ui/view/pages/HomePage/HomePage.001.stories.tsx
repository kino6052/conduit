import { HomePage } from ".";
import { DefaultData } from "./data";
import { THomePageProps } from "./types";

export default {
  title: "Scenarios/HomePage",
  component: HomePage,
  argTypes: {},
};

export const Step1: { args: THomePageProps } = {
  args: {
    ...DefaultData,
    posts: [
      {
        ...DefaultData.posts[0],
        linkProps: {
          onClick: async () => {
            window.open("/?path=/story/scenarios-homepage--step-2", "_blank");
          },
        },
      },
    ],
  },
};
