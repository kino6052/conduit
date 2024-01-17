import { Icon } from ".";

export default {
  title: "Components/Icon",
  component: Icon,
  argTypes: {
    variant: {
      options: ["with-icon", "with-image"],
      control: { type: "select" },
    },
  },
};

export const Default = {
  args: {
    icon: "favorite",
    variant: "with-icon",
    className: {},
    divClassName: {},
  },
};
