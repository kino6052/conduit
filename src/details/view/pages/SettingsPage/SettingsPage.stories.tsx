import { SettingsPage } from ".";
import { DefaultData } from "./data";
import { TSettingsPageProps } from "./types";

export default {
  title: "Pages/SettingsPage",
  component: SettingsPage,
  argTypes: {},
};

export const Default: { args: TSettingsPageProps } = {
  args: DefaultData,
};
