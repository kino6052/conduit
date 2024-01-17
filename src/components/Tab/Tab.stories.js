import { Tab } from ".";

export default {
  title: "Components/Tab",
  component: Tab,
  argTypes: {
    variant: {
      options: ["menu", "selected", "unselected"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    hasIcon: true,
    hasUnderline: true,
    text: "Home",
    variant: "menu",
    className: {},
    divClassName: {},
    iconIcon: "favorite",
  },
};
