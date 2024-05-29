import { HomePage } from ".";
import { DefaultData } from "./data";
import { THomePageProps } from "./types";

export default {
  title: "Pages/HomePage",
  component: HomePage,
  argTypes: {},
};

export const Default: { args: THomePageProps } = {
  args: DefaultData,
};

export const Loading: { args: THomePageProps } = {
  args: {
    ...DefaultData,
    isLoading: true,
  },
};
