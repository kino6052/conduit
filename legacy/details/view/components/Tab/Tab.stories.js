import { Tab } from ".";

export default {
  title: "Components/Tab",
  component: Tab,
  argTypes: {},
};

export const Menu = {
  args: {
    text: "Home",
    variant: "menu",
    icon: "favorite",
  },
};

export const Default = {
  args: {
    text: "Tab 1",
  },
};

export const DefaultActive = {
  args: {
    text: "Tab 1",
    isActive: true
  },
};