import { TArticleBannerProps } from "./types";
import { ArticleBanner } from "./ArticleBanner";

export default {
  title: "Components/Banner/ArticleBanner",
  component: ArticleBanner,
  argTypes: {},
};

export const Default = {
  args: {
    title: "Article",
    userInfoProps: {
      date: new Date().toISOString(),
      username: "John Lobster",
    },
  } as TArticleBannerProps,
};
