import { Button } from ".";

export default {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      options: ["warning", "secondary-small", "primary-large", "secondary-large", "primary-small", "warning-large"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    text: "Text",
    hasIcon: true,
    variant: "warning",
    className: {},
    divClassName: {},
  },
};
