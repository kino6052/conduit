import { ProfilePage } from ".";
import { DefaultData } from "./data";
import { TProfilePageProps } from "./types";

export default {
  title: "Pages/ProfilePage",
  component: ProfilePage,
  argTypes: {},
};

export const Default: { args: TProfilePageProps } = {
  args: DefaultData,
};
